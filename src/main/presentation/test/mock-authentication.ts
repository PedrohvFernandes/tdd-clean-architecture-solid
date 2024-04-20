import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params!: AuthenticationParams
  callsCount = 0
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    // Toda vez que eu chamo o auth eu incremento o callsCount, para saber quantas vezes foi chamado
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
