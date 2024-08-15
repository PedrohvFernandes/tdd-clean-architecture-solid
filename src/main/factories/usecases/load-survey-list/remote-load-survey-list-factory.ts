import { RemoteLoadSurveyList } from '@/data/usecases/loado-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { makeUrlApi } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientAdapter } from '@/main/factories/http/axios-http-client-adapter-factory'

export function makeRemoteLoadSurveyList(): LoadSurveyList {
  return new RemoteLoadSurveyList(
    makeUrlApi('/surveys'),
    makeAxiosHttpClientAdapter()
  )
}
