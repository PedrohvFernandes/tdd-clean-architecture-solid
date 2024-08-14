import { useContext } from 'react'

import { SurveyContext } from '../survey-list/survey-context'

export function useHookContextSurveyList() {
  const context = useContext(SurveyContext)
  return context
}
