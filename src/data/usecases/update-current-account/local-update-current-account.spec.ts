import { LocalUpdateCurrentAccount } from './local-update-current-account'

import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()

    const account = mockAccountModel()
    await sut.save(account)

    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  // É um teste meio desencerarão, pois o teste anterior já cobre tudo o que precisamos. No caso esse teste aqui é uma exceção, hoje o localstorage que é o que iremos usar para salvar o token do usuário não retorna nada, mas caso um dia usarmos algo, uma lib que retorne algo, esse teste seria util.
  // Esse teste garante que se der um erro no nosso caso uso não queremos que tenha um try catch, queremos que o erro seja propagado para quem chamou o método, no caso o componentes do React, e ai ele decide o que ele faz com o erro
  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()

    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.save(mockAccountModel())

    await expect(promise).rejects.toThrow(new Error())
  })

  test('Should throw if accessToken if falsy', async () => {
    const { sut } = makeSut()

    const promise = sut.save(undefined as any)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
