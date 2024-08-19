import { makeAuthorizeHttpGetClientDecorator } from '../../decorators/authorize-http-get-client-decorator-factory'

import { RemoteLoadSurveyList } from '@/data/usecases/loado-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { makeUrlApi } from '@/main/factories/http/api-url-factory'

export function makeRemoteLoadSurveyList(): LoadSurveyList {
  return new RemoteLoadSurveyList(
    makeUrlApi('/surveys'),
    makeAuthorizeHttpGetClientDecorator()
  )
}
