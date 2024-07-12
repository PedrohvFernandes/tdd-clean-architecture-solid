import { faker } from '@faker-js/faker'
import axios from 'axios'

// Mockando a função post do axios para que ela simule o envio de dados para pegar o resultado
export const mockedAxiosResult = (): any => ({
  // Um body qualquer, tanto faz o conteudo aqui
  body: faker.helpers.objectEntry({
    key: faker.string.uuid()
  }),
  statusCode: faker.number.int
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  // Usando o mockResolvedValue para simular o envio de dados para pegar o resultado como resultado resolvido, passando um falso retorno, com um body e um statusCode so para testar
  mockedAxios.post.mockResolvedValue(mockedAxiosResult())

  mockedAxios.get.mockResolvedValue(mockedAxiosResult())

  return mockedAxios
}
