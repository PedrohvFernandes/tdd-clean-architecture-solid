import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {}

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK:
        return httpResponse.body as LoadSurveyList.Model[]
      case HttpStatusCode.NO_CONTENT:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model
}
