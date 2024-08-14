import { ButtonDefault } from '@/main/presentation/components/buttons'

import { useHookContextSurveyList } from './contexts/survey-list/use-hook-context-survey-list'

export function Error() {
  const { state } = useHookContextSurveyList()
  return (
    <div
      className="text-red-500 bg-red-100 border border-red-400 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Erro!</strong>
      <span className="block sm:inline" data-testid="error">
        {state.error}
      </span>
      <ButtonDefault>Tentar novamente</ButtonDefault>
    </div>
  )
}
