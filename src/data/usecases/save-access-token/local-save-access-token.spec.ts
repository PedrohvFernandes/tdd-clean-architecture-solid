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

  // É um teste meio desnecerário, pois o teste anterior já cobre tudo o que precisamos. No caso esse teste aqui é uma execeção, hoje o localstorage que é o que iremos usar para salvar o token do usuário não retorna nada, mas caso um dia usarmos algo, uma lib que retorne algo, esse teste seria util.
})
