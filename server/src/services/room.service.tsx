type AbstractPadEvent = Record<string, unknown>

export class Room {
  private history: AbstractPadEvent[]
  public lastActivityTs: number

  constructor(public readonly roomId: string) {
    this.lastActivityTs = Date.now()
  }

  bumpLastActivityTs () {
    this.lastActivityTs = Date.now()
  }

  addToHistory (event: AbstractPadEvent) {
    this.bumpLastActivityTs()
    this.history.push(event)
  }
}
