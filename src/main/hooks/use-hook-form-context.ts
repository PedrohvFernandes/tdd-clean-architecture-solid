import { useContext } from 'react'

import { FormContext } from '@/contexts/form/form-context'

export function useHookForm() {
  const context = useContext(FormContext)
  return context
}
