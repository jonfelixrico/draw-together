import { getClientUUID } from '@/modules/common/local-storage-vars.util'
import { useRef } from 'react'

export function useClientId() {
  const ref = useRef<string>(getClientUUID())
  return ref.current
}
