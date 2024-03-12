import { nanoid } from 'nanoid'

const CLIENT_UUID_LS_KEY = 'uuid'

export function getClientUUID() {
  let uuid = window.localStorage.getItem(CLIENT_UUID_LS_KEY)
  if (uuid) {
    return uuid
  }

  uuid = nanoid()
  window.localStorage.setItem(CLIENT_UUID_LS_KEY, uuid)
  return uuid
}
