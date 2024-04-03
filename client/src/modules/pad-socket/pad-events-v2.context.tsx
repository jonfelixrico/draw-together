import { getApiClient } from '@/modules/common/api-client'
import {
  PAD_SOCKET_EVENT,
  PadResponse,
} from '@/modules/pad-socket/pad-socket.types'
import { isCancel } from 'axios'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ReplaySubject, Subject, concat } from 'rxjs'
import { Socket } from 'socket.io-client'

function prepareCatchUp(roomId: string) {
  const abortCtrl = new AbortController()
  const api = getApiClient()
  const events$ = new ReplaySubject<PadResponse>()

  async function startCatchUp() {
    const lengthResp = await api.get<{ length: number }>(
      `/room/${roomId}/event/length`
    )
    const length = lengthResp.data.length

    const chunkSize = Math.min(Math.max(Math.round(length * 0.2), 50), 1000)

    try {
      let currentIdx = 0
      while (currentIdx < length) {
        const start = currentIdx
        const end = Math.min(currentIdx + chunkSize, length)
        currentIdx = end

        console.debug('Fetching %d to %d', start, end)

        const { data } = await api.get<PadResponse[]>(`/room/${roomId}/event`, {
          signal: abortCtrl.signal,
          params: {
            start,
            end,
          },
        })

        for (const event of data) {
          events$.next(event)
        }

        console.debug('Finished fetching %d to %d', start, end)
      }

      console.debug('Finished catching up to %s')
      events$.complete()
    } catch (e) {
      if (isCancel(e)) {
        console.debug('Catch up cancelled for room %s', roomId, length)
        events$.complete()
        return
      }

      events$.error(e)
      throw e
    }
  }

  return {
    start: startCatchUp,
    stop: () => {
      abortCtrl.abort()
    },
    events$,
  }
}

function prepareLiveWatcher(socket: Socket) {
  const events$ = new ReplaySubject<PadResponse>()

  function watcher(event: PadResponse) {
    events$.next(event)
  }

  function start() {
    socket.on(PAD_SOCKET_EVENT, watcher)
  }

  function stop() {
    events$.complete()
    socket.off(PAD_SOCKET_EVENT, watcher)
  }

  return {
    events$,
    start,
    stop,
  }
}

function usePadEventsObservable(roomId: string, socket: Socket) {
  const [observable, setObservable] = useState<Subject<PadResponse> | null>(
    null
  )

  useEffect(() => {
    const catchUp = prepareCatchUp(roomId)
    const live = prepareLiveWatcher(socket)

    catchUp.start()
    live.start()

    const allEvents$ = new Subject<PadResponse>()
    concat(catchUp.events$, live.events$).subscribe(allEvents$)
    setObservable(allEvents$)

    return () => {
      allEvents$.complete()
      catchUp.stop()
      live.stop()
      setObservable(null)
    }
  }, [roomId, socket])

  return observable
}

const PadEventsContext = createContext<Subject<PadResponse> | null>(null)

export function PadEventsProvider({
  roomId,
  children,
  socket,
}: {
  children: ReactNode
  socket: Socket
  roomId: string
}) {
  const obs = usePadEventsObservable(roomId, socket)
  return (
    <PadEventsContext.Provider value={obs}>
      {children}
    </PadEventsContext.Provider>
  )
}

// Can't be bothered to make a new file for just the hook
// eslint-disable-next-line react-refresh/only-export-components
export function usePadEvents() {
  const ctxValue = useContext(PadEventsContext)

  return useMemo(() => ctxValue ?? new Subject<PadResponse>(), [ctxValue])
}
