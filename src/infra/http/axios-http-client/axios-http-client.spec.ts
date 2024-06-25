// O describe desse teste usa o jest.Describe para descrever os testes

import { AxiosHttpClientAdapter } from './axios-http-client-adapter'

import { mockPostRequest } from '@/data/test'
import { mockAxios, mockedAxiosResult } from '@/infra/test'
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

  test('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut()

    // const httpResponse = await sut.post(mockPostRequest())
    // Usamos o post do axios do AxiosHttpClientAdapter passando um mock de requisição
    const httpPromiseResponse = sut.post(mockPostRequest())

    // const mockedResolvedValue = await mockedAxios.post.mock.results[0].value
    // Comparamos o result do post do axios mock-axios(mockedAxios) com o result do post  do AxiosHttpClientAdapter
    const mockedResolvedValuePromise = mockedAxios.post.mock.results[0].value
    expect(httpPromiseResponse).toEqual(mockedResolvedValuePromise)
  })

  test('Should return the correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = makeSut()
    // Fazemos o post do axios mockado retornar um erro, porque por padrão ele retorna como resolvido, retornando o mock de resposta do axios
    mockedAxios.post.mockRejectedValueOnce({
      response: mockedAxiosResult()
    })
    const httpPromiseResponse = sut.post(mockPostRequest())

    const mockedResolvedValuePromise = mockedAxios.post.mock.results[0].value
    expect(httpPromiseResponse).toEqual(mockedResolvedValuePromise)
  })
})
