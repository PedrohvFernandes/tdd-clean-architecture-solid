import { useEffect } from 'react'

import { SurveyItemEmpty } from './components'

import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

export function SurveyList({ loadSurveyList }: Props) {
  useEffect(() => {
    ;(async function () {
      loadSurveyList.loadAll()
    })()
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
        <SurveyItemEmpty />
      </ul>
    </div>
  )
}
