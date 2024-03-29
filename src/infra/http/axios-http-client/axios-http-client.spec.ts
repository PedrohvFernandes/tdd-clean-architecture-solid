/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosHttpClient } from './axios-http-client'

import { HttpPostParams } from '@/data/protocols/http'
import { faker } from '@faker-js/faker'
import axios from 'axios'

// Mockando a lib do axios. Fazendo isso temos acesso a todas as funções do axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostoRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectEntry({
    key: faker.string.uuid()
  })
})

// A classe de teste do AxiosHttpClient
describe('AxiosHttpClient', () => {
  // Vamos testar a url. Se a url passada para o axios é a mesma que passamos para o AxiosHttpClient e que la é passada para o axios e se estou usando o verbo correto que é o post para chamar a url, e testamos se o body passado para o axios é o mesmo que passamos para o AxiosHttpClient
  test('Should call axios with correct values', async () => {
    const request = mockPostoRequest()

    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return', async () => {
    const request = mockPostoRequest()

    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
