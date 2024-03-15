import { PadHistoryRequest, PadHistoryResponse } from "@/typings/pad-history-socket.types";
import { SocketEventPayload } from "@/typings/socket.types";
import { Observable, ReplaySubject, Subject, concat, takeWhile } from "rxjs";
import { Socket } from "socket.io-client";

type Payload = SocketEventPayload<unknown>

export class PadEventsService {
  private catchUp$ = new ReplaySubject<Payload | 'DONE'>()
  private live$ = new ReplaySubject<Payload>()

  private events$ = new Subject<Payload>()

  constructor(private socket: Socket) {
    concat(
      this.catchUp$
        .pipe(takeWhile(event => event !== 'DONE')) as Observable<Payload>,
      this.live$
    ).subscribe(obs => this.events$.next(obs))
  }

  private async performCatchUp () {
    const { LENGTH }: PadHistoryResponse = await this.socket.emitWithAck(
      'PAD_HISTORY',
      { LENGTH: true } as PadHistoryRequest
    )
    const length = LENGTH as number

    let currentIdx = 0
    while (currentIdx < length) {
      const start = currentIdx
      const end = Math.min(currentIdx + 100, LENGTH as number)
      currentIdx = end

      console.debug('Fetching %d to %d', start, end)
      const { FETCH }: PadHistoryResponse = await this.socket.emitWithAck(
        'PAD_HISTORY',
        {
          FETCH: [start, end]
        } as PadHistoryRequest
      )

      const events = FETCH as Payload[]
      for (const event of events) {
        this.catchUp$.next(event)
      }

      console.debug('Finished fetching %d to %d', start, end)
    }

    this.catchUp$.next('DONE')
    console.info('Finished with the catch-up')
  }

  private startListening () {
    this.socket.on('PAD', (event: Payload) => {
      this.live$.next(event)
    })
  }

  start() {
    this.performCatchUp() // intended to not be awaited
    this.startListening()
  }

  on<T>(handler: (payload: SocketEventPayload<T>) => void) {
    const subscription = this.events$.subscribe(evt => {
      handler(evt as SocketEventPayload<T>)
    })

    return () => subscription.unsubscribe()
  }
}
