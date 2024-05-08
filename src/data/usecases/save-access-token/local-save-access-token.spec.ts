import { LocalSaveAccessToken } from './local-save-access-token'

import { SetStorageMock } from '@/data/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()

    const accessToken = faker.string.uuid()
    await sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  // É um teste meio desencerarão, pois o teste anterior já cobre tudo o que precisamos. No caso esse teste aqui é uma exceção, hoje o localstorage que é o que iremos usar para salvar o token do usuário não retorna nada, mas caso um dia usarmos algo, uma lib que retorne algo, esse teste seria util.
  // Esse teste garante que se der um erro no nosso caso uso não queremos que tenha um try catch, queremos que o erro seja propagado para quem chamou o método, no caso o componentes do React, e ai ele decide o que ele faz com o erro
  test('Should throw uf SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()

    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())

    const promise = sut.save(faker.string.uuid())

    await expect(promise).rejects.toThrow(new Error())
  })
})
