export class Room {
  /*
   * TODO add types for the "abstract" event
   * For now, we'll just use unknown since this class doesn't care about what type it is, anyway
   */
  private _history: unknown[] = []
  private _lastActivityTs: number

  constructor(public readonly roomId: string) {
    this._lastActivityTs = Date.now()
  }

  bumpLastActivityTs () {
    this._lastActivityTs = Date.now()
  }

  addToHistory (event: unknown) {
    this.bumpLastActivityTs()
    this._history.push(event)
  }

  get history () {
    return this._history
  }

  get lastActivityTs () {
    return this._lastActivityTs
  }
}
