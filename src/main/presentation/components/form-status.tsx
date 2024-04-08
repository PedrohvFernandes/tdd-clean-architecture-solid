import { Ellipsis } from './loadings'

import { useHookForm } from '@/hooks/use-hook-form-context'

export function FormStatus() {
  const { isLoading, errorMessage } = useHookForm()
  return (
    // Iremos colocar um atributo de teste para identificar os elementos ou componentes do componente
    <div className="flex flex-col items-center gap-4" data-testid="error-wrap">
      {isLoading && <Ellipsis />}
      {errorMessage && (
        <span className="text-red-500 font-bold">{errorMessage}</span>
      )}
    </div>
  )
}
