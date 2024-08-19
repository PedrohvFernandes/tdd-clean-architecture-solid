import { RemoteAddAccount } from './remote-add-account'

import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { mockAddAccountModel, mockAddAccountParams } from '@/domain/test'
// import { AddAccountParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAddAccount
  // httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
  httpPostClientSpy: HttpPostClientSpy<RemoteAddAccount.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  // const httpPostClientSpy = new HttpPostClientSpy<
  //   AddAccountParams,
  //   AccountModel
  // >()
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAddAccount.Model>()

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

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST
    }

    const promiseErrorException = sut.add(mockAddAccountParams())

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.SERVER_ERROR
    }

    const promiseErrorException = sut.add(mockAddAccountParams())

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND
    }

    const promiseErrorException = sut.add(mockAddAccountParams())

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an AddAccount.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const httpResult = mockAddAccountModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: {
        accessToken: httpResult.accessToken,
        name: httpResult.name
      }
    }

    const account = await sut.add(mockAddAccountParams())

    // To equal compara os valores dos objetos
    expect(account).toEqual(httpResult)
  })
})
