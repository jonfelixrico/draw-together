import { faker } from '@faker-js/faker'

export class Room {
  /*
   * TODO add types for the "abstract" event
   * For now, we'll just use unknown since this class doesn't care about what type it is, anyway
   */
  private _history: unknown[] = []
  private _lastActivityTs: number
  private _name: string

  constructor(public readonly roomId: string) {
    this._lastActivityTs = Date.now()
    this._name = `${faker.word.adjective()} ${faker.animal.type()}`
  }

  bumpLastActivityTs() {
    this._lastActivityTs = Date.now()
  }

  addToHistory(event: unknown) {
    this.bumpLastActivityTs()
    this._history.push(event)
  }

  get history() {
    return this._history
  }

  get lastActivityTs() {
    return this._lastActivityTs
  }

  get name() {
    return this._name
  }
}
