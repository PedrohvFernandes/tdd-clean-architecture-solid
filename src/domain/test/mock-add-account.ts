import { mockAccountModel } from '@/domain/test'
import { AddAccount } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

// Um factory para gerar um AccountModel fake
export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params!: AddAccount.Params
  callsCount = 0

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    this.callsCount++

    return this.account
  }
}
