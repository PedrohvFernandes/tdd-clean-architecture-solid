// Objetos de mock para os testes do caso de uso de autenticação.
import { mockAccountModel } from './mock-account'

import { Authentication } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

// Email e senha falsos usando o faker, para o body. Um factory(função que gera objeto - factory) para gerar uma conta fake
export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

// Um factory para gerar um AccountModel fake
export const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel()

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params!: Authentication.Params
  callsCount = 0
  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params
    // Toda vez que eu chamo o auth eu incremento o callsCount, para saber quantas vezes foi chamado
    this.callsCount++
    return this.account
  }
}
