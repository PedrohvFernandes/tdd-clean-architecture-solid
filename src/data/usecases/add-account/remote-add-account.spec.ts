import { RemoteAddAccount } from './remote-add-account'

import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test'
import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { mockAddAccountParams } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)

    sut.add(mockAddAccountParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const AddAccountParams = mockAddAccountParams()
    await sut.add(AddAccountParams)
    expect(httpPostClientSpy.body).toEqual(AddAccountParams)
  })

  test('Should throw EmailInUseError InvalidCredentialsError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN
    }

    const promiseErrorException = sut.add(mockAddAccountParams())

    await expect(promiseErrorException).rejects.toThrow(new EmailInUseError())
  })
})
