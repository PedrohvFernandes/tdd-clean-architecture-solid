import { ButtonDefault } from '@/main/presentation/components/buttons'

import { useHookContextSurveyList } from './contexts/survey-list/use-hook-context-survey-list'

export function Error() {
  const { state, setState } = useHookContextSurveyList()

  const handleReload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload })
  }
  return (
    <div
      className="text-red-500 bg-red-100 border border-red-400 px-4 py-3 rounded relative flex flex-col gap-2"
      role="alert"
    >
      <strong className="font-bold">Erro!</strong>
      <span className="block sm:inline text-center" data-testid="error">
        {state.error}
      </span>
      <ButtonDefault name="reload" onClick={handleReload}>
        Tentar novamente
      </ButtonDefault>
    </div>
  )
}
