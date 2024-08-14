/* eslint-disable multiline-ternary */

import { useCallback, useEffect, useState } from 'react'

import { Error, UlSurveyListItem } from './components'
import { SurveyContext } from './components/contexts/survey-list/survey-context'

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

  const setError = useCallback((error: string) => {
    setState((old) => ({ ...old, error }))
  }, [])

  const setSurveys = useCallback((surveys: SurveyModel[]) => {
    setState((old) => ({ ...old, surveys }))
  }, [])

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setSurveys(surveys))
      .catch((error) => setError(error.message))
  }, [loadSurveyList, state, setError, setSurveys])

  return (
    <div className="flex flex-col self-center w-full max-w-[800px] flex-grow py-6 px-10 gap-10 bg-disabled-background">
      <h2 className="text-primary-DARK text-xl font-bold uppercase">
        Enquetes
      </h2>
      <SurveyContext.Provider value={{ state, setError, setSurveys }}>
        {state.error ? <Error /> : <UlSurveyListItem />}
      </SurveyContext.Provider>
    </div>
  )
}
