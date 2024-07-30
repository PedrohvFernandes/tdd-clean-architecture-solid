import { useContext } from 'react'

import { ApiContext } from '@/contexts/api/api-context'

export function useHookApi() {
  const context = useContext(ApiContext)
  return context
}
