import { makeRemoteLoadSurveyList } from '@/main/factories/usecases/load-survey-list/remote-load-survey-list-factory'
import { SurveyList } from '@/main/presentation/pages/survey-list/survey-list'

export function MakeSurvey() {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />
}
