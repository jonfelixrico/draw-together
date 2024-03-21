type UnknownPadEvent = Record<string, unknown>

export class Room {
  private history: UnknownPadEvent[] = []
  public lastActivityTs: number

  constructor(public readonly roomId: string) {
    this.lastActivityTs = Date.now()
  }

  bumpLastActivityTs () {
    this.lastActivityTs = Date.now()
  }

  addToHistory (event: UnknownPadEvent) {
    this.bumpLastActivityTs()
    this.history.push(event)
  }
}