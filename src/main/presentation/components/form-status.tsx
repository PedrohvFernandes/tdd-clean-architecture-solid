import { Ellipsis } from './loadings'

import { useHookForm, useHookErrorState } from '@/main/hooks'
import { twMerge } from 'tailwind-merge'

export function FormStatus() {
  const { isLoading } = useHookForm()
  const { errorMessageMain } = useHookErrorState()
  return (
    // Iremos colocar um atributo de teste para identificar os elementos ou componentes do componente
    <div
      className={twMerge(
        'hidden items-center gap-4',
        errorMessageMain && 'flex flex-col'
      )}
      data-testid="error-wrap"
    >
      {isLoading && <Ellipsis />}
      {errorMessageMain && (
        <span className="text-red-500 font-bold" data-testid="main-error">
          {errorMessageMain}
        </span>
      )}
    </div>
  )
}
