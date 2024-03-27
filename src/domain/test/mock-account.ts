// Objetos de mock para os testes do caso de uso de autenticação.

import { AccountModel } from '../models'

import { AuthenticationParams } from '@/domain/usecases/authentication'
import { faker } from '@faker-js/faker'

// Email e senha falsos usando o faker, para o body. Um factory(função que gera objeto - factory) para gerar uma conta fake
export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

// Um factory para gerar um AccountModel fake
export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
