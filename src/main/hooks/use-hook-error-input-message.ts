import { useHookErrorState } from './use-hook-error-state-context'

export function useHookErrorInputMessage(fieldName: string) {
  const errorState = useHookErrorState()
  // Pegamos o erro de acordo com o nome do input. o as keyof typeof valueContext é para tipar o erro
  const error = errorState[`${fieldName}Error` as keyof typeof errorState]
  return error
}
