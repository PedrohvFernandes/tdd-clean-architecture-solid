/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosHttpClientAdapter } from './axios-http-client-adapter'

import { HttpPostParams } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'
import axios from 'axios'

// Mockando a lib do axios. Fazendo isso temos acesso a todas as funções do axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  status: faker.number.bigInt,
  data: faker.helpers.objectEntry({
    key: faker.string.uuid()
  })
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClientAdapter => {
  return new AxiosHttpClientAdapter()
}

const mockPostoRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectEntry({
    key: faker.string.uuid()
  })
})

// A classe de teste do AxiosHttpClientAdapter
describe('AxiosHttpClientAdapter', () => {
  // Vamos testar a url. Se a url passada para o axios é a mesma que passamos para o AxiosHttpClientAdapter e que la é passada para o axios e se estou usando o verbo correto que é o post para chamar a url, e testamos se o body passado para o axios é o mesmo que passamos para o AxiosHttpClientAdapter
  test('Should call axios with correct values', async () => {
    const request = mockPostoRequest()

    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  // O nosso http response responde com um status code e um body. Então vamos testar se o axios retorna o status code e o body correto
  test('Should return the correct and body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(mockPostoRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
