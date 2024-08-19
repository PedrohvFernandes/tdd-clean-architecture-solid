// Objetos de mock para os testes do caso de uso de autenticação.
import { AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

// Um factory para gerar um AccountModel fake
export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
  name: faker.internet.userName()
})
