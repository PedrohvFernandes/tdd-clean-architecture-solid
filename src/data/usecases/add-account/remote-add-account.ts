import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.OK:
        return httpResponse.body as AccountModel
      case HttpStatusCode.FORBIDDEN:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
