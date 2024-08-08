/* eslint-disable multiline-ternary */
import { useEffect, useState } from 'react'

import { ButtonDefault } from '../../components/buttons'
import { SurveyItem, SurveyItemEmpty } from './components'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: Readonly<Props>) {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((old) => ({ ...old, surveys })))
      .catch((error) => setState((old) => ({ ...old, error: error.message })))
  }, [loadSurveyList, state])

  return (
    <div className="flex flex-col self-center w-full max-w-[800px] flex-grow py-6 px-10 gap-10 bg-disabled-background">
      <h2 className="text-primary-DARK text-xl font-bold uppercase">
        Enquetes
      </h2>

      {state.error ? (
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
      ) : (
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
      )}
    </div>
  )
}
