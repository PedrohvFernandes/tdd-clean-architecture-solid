import { useContext } from 'react'

import { ErrorContext } from '@/contexts/form/error-state-context'

export function useHookErrorState() {
  const context = useContext(ErrorContext)
  return context
}
