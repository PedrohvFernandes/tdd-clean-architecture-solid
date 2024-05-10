import { LocalStorageAdapter } from './local-storage-adapter'

import { faker } from '@faker-js/faker'

import 'jest-localstorage-mock'

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // Não testamos exceções aqui porque o localStorage ñ possui exceções, so testamos se o localStorage foi chamado com os valores corretos. E aqui de fato na infra é a implementação do localStorage, no data é a interface, la da para testar exceções porque ele não sabe qual lib vai ser usada para implementar a interface, logo futuramente podemos usar outra lib para implementar a interface e nele talvez tenha exceções
  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.word.adjective()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
