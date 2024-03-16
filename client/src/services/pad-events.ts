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
      // ... replay all events from the start of the room until the time BEFORE connecting ...
      this.catchUp$
        .pipe(takeWhile(event => event !== 'DONE')) as Observable<Payload>,
      // ... replay all events AFTER connecting ...
      this.live$
    )
      /*
       * If event$ was this observable (output of concat), it won't work since each call to the `on` message
       * will replay all events from the beginning of the room to the current time.
       * 
       * We circumvent this observable behavior by making a subject listen to this observable's emission. Calls to
       * `on` will subscribe to this subject. This way, the events wont replay on subscribe; only the latest will.
       * 
       * "Our intention is to catch up first, but in the last mile we're choosing an subject that emits ONLY the latest emissions?"
       * Our decision is like this because we don't want to make "catch up listeners" vs "live listeners". Not necessary for the scope
       * of this mini-project yet.
       * 
       * This latest-emission-only approach can still work -- we'll just have to ASSUME that the appropriate listeners have been established already.
       */
      .subscribe(this.events$)
  }

  private async fetchPreConnectionEvents () {
    const { LENGTH }: PadHistoryResponse = await this.socket.emitWithAck(
      'PAD_HISTORY',
      { LENGTH: true } as PadHistoryRequest
    )
    const length = LENGTH as number
    const chunkSize = Math.min(Math.round(length * 0.20), 1000)

    let currentIdx = 0
    while (currentIdx < length) {
      const start = currentIdx
      const end = Math.min(currentIdx + chunkSize, LENGTH as number)
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

  private listenForLiveEvents () {
    this.socket.on('PAD', (event: Payload) => {
      this.live$.next(event)
    })
  }

  start() {
    this.fetchPreConnectionEvents() // intended to not be awaited
    this.listenForLiveEvents()
  }

  on<T>(handler: (payload: SocketEventPayload<T>) => void) {
    const subscription = this.events$.subscribe(evt => {
      handler(evt as SocketEventPayload<T>)
    })

    return () => subscription.unsubscribe()
  }
}
