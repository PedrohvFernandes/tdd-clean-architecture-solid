import { AxiosHttpClientAdapter } from './axios-http-client-adapter'

import { mockPostRequest } from '@/data/test'
import { mockAxios } from '@/infra/test'
import axios from 'axios'

// Mockando a lib do axios. Fazendo isso temos acesso a todas as funções do axios
jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClientAdapter
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  // return new AxiosHttpClientAdapter()
  const sut = new AxiosHttpClientAdapter()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

// A classe de teste do AxiosHttpClientAdapter
describe('AxiosHttpClientAdapter', () => {
  // Vamos testar a url. Se a url passada para o axios é a mesma que passamos para o AxiosHttpClientAdapter e que la é passada para o axios e se estou usando o verbo correto que é o post para chamar a url, e testamos se o body passado para o axios é o mesmo que passamos para o AxiosHttpClientAdapter
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()

    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  // O nosso http response responde com um status code e um body. Então vamos testar se o axios retorna o status code e o body correto
  test('Should return the correct and body', () => {
    const { sut, mockedAxios } = makeSut()
    // const httpResponse = await sut.post(mockPostRequest())
    const httpPromiseResponse = sut.post(mockPostRequest())
    // const mockedResolvedValue = await mockedAxios.post.mock.results[0].value
    const mockedResolvedValuePromise = mockedAxios.post.mock.results[0].value
    expect(httpPromiseResponse).toEqual(mockedResolvedValuePromise)
  })
})
