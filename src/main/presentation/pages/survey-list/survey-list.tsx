/* eslint-disable multiline-ternary */

import { useEffect, useState } from 'react'

import { Error, UlSurveyListItem } from './components'
import { SurveyContext } from './components/contexts/survey-list/survey-context'

import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: Readonly<Props>) {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const setError = (error: string) => {
    setState((old) => ({ ...old, error }))
  }

  const setSurveys = (surveys: LoadSurveyList.Model[]) => {
    setState((old) => ({ ...old, surveys }))
  }

  const setReload = () => {
    setState((old) => ({ ...old, reload: !old.reload }))
  }

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setSurveys(surveys))
      .catch((error) => setError(error.message))
  }, [state.reload])

  return (
    <SurveyContext.Provider
      value={{ state, setError, setSurveys, setReload, setState }}
    >
      <div className="flex flex-col self-center w-full max-w-[800px] flex-grow py-6 px-10 gap-10 bg-disabled-background">
        <h2 className="text-primary-DARK text-xl font-bold uppercase">
          Enquetes
        </h2>

        {state.error ? <Error /> : <UlSurveyListItem />}
      </div>
    </SurveyContext.Provider>
  )
}
