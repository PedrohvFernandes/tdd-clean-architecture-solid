/* eslint-disable multiline-ternary */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Error, UlSurveyListItem } from './components'
import { SurveyContext } from './components/contexts/survey-list/survey-context'

import { ConfigRoute } from '@/config/index'
import { AccessDeniedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { useHookApi } from '@/main/hooks'

type Props = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: Readonly<Props>) {
  const { setCurrentAccount } = useHookApi()
  const navigate = useNavigate()

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
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined as any)
          navigate(ConfigRoute.fourDev.login.path)
          return
        }
        setError(error.message)
      })
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
