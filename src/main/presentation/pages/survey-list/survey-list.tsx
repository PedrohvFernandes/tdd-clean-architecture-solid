/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'

import { SurveyItem, SurveyItemEmpty } from './components'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: Props) {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => setState({ surveys }))
  }, [loadSurveyList])

  return (
    <div className="flex flex-col self-center w-full max-w-[800px] flex-grow py-6 px-10 gap-10 bg-disabled-background">
      <h2 className="text-primary-DARK text-xl font-bold uppercase">
        Enquetes
      </h2>
      <ul
        className="flex flex-wrap justify-between gap-6"
        data-testid="survey-list"
      >
        {state.surveys.length ? (
          state.surveys.map((survey) => (
            <SurveyItem key={survey.id} survey={survey} />
          ))
        ) : (
          <SurveyItemEmpty />
        )}
      </ul>
    </div>
  )
}
