import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator'

import { HttpGetParams } from '@/data/protocols/http'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { mockAccountModel } from '@/domain/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy
  )

  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        randomProperty: faker.string.uuid(),
        anotherRandomProperty: faker.string.uuid()
      }
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  // Aqui estamos testando se o token de acesso está sendo enviado corretamente, sem ter o header na requisição. Ele é adicionado no momento que passamos a request para o get, e ele adiciona o token de acesso no header quem vem do GetStorage
  test('Should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()

    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  // Aqui testamos se no headers ira adicionar o token + com o que já tinha no headers
  test('Should merge headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut()

    const random = {
      randomProperty: faker.string.uuid(),
      anotherRandomProperty: faker.string.uuid()
    }

    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: random
    }

    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      randomProperty: random.randomProperty,
      anotherRandomProperty: random.anotherRandomProperty,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    const httpResponse = await sut.get(mockGetRequest())

    expect(httpResponse).toEqual(httpGetClientSpy.response)
  })
})
