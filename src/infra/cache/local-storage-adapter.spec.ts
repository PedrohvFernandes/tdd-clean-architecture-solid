import { LocalStorageAdapter } from './local-storage-adapter'

import { AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

import 'jest-localstorage-mock'

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}

describe('LocalStorageAdapter', () => {
  // Entre os testes eu limpo sempre o localstorage, so pra evitar o problema de um teste influenciar no outro
  beforeEach(() => {
    localStorage.clear()
  })

  // Não testamos exceções aqui porque o localStorage ñ possui exceções, so testamos se o localStorage foi chamado com os valores corretos. E aqui de fato na infra é a implementação do localStorage, no data é a interface, la da para testar exceções porque ele não sabe qual lib vai ser usada para implementar a interface, logo futuramente podemos usar outra lib para implementar a interface e nele talvez tenha exceções
  test('Should call localStorage.setItem with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    /*
    Porque que eu tirei o objectEntry do faker:
      objectEntry --> Ele retorna aleatoriamente algum Chave:valor do objeto e não todos
      objectKey --> Ele retorna aleatoriamente uma chave do objeto
      objectValue --> Ele retorna aleatoriamente um valor do objeto de alguma chave
    Com isso preferi fazer meu objeto randomico
    */
    const value = {
      accessToken: faker.string.uuid(),
      name: faker.internet.userName()
    } as AccountModel
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })

  test('Should call localStorage.getItem with correct value', async () => {
    const sut = makeSut()

    const key = faker.database.column()

    const value = {
      accessToken: faker.string.uuid(),
      name: faker.internet.userName()
    } as AccountModel

    sut.set(key, value)

    // Dentro do localStorage temos o getItem que é uma função que recebe uma chave e retorna o valor que está salvo naquela chave, então estamos mockando essa função para que ela retorne o valor que passamos, assim podemos testar se o valor que passamos é o mesmo que ele retorna
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
