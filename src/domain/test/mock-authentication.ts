// Objetos de mock para os testes do caso de uso de autenticação.

import { faker } from '@faker-js/faker'
import { AuthenticationParams } from 'domain/usecases/authentication'

// Email e senha falsos usando o faker, para o body. Um factory(função que gera objeto) para gerar uma conta fake
export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
