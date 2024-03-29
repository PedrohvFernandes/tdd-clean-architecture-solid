import { AxiosHttpClient } from './axios-http-client'

import { faker } from '@faker-js/faker'
import axios from 'axios'

// Mockando a lib do axios. Fazendo isso temos acesso a todas as funções do axios
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

// A classe de teste do AxiosHttpClient
describe('AxiosHttpClient', () => {
  // Vamos testar a url. Se a url passada para o axios é a mesma que passamos para o AxiosHttpClient e que la é passada para o axios
  test('Should call axios with correct URL', async () => {
    const url = faker.internet.url()

    const sut = makeSut()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
