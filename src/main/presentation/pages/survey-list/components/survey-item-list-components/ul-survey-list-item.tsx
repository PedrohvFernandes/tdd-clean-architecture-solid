import { useHookContextSurveyList } from '../contexts/survey-list/use-hook-context-survey-list'
import { SurveyItemEmpty } from '../shimmer-item-list'
import { SurveyItem } from '../survey-item/survey-item'

import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

/* eslint-disable multiline-ternary */
export function UlSurveyListItem() {
  const { state } = useHookContextSurveyList()
  return (
    <ul
      className="flex flex-wrap justify-between gap-6"
      data-testid="survey-list"
    >
      {state.surveys.length ? (
        state.surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  )
}
