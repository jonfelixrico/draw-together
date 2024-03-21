export class Room {
  /*
   * TODO add types for the "abstract" event
   * For now, we'll just use unknown since this class doesn't care about what type it is, anyway
   */
  public history: unknown[] = []
  public lastActivityTs: number

  constructor(public readonly roomId: string) {
    this.lastActivityTs = Date.now()
  }

  bumpLastActivityTs () {
    this.lastActivityTs = Date.now()
  }

  addToHistory (event: unknown) {
    this.bumpLastActivityTs()
    this.history.push(event)
  }
}