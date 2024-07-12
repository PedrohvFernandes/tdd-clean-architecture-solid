import { faker } from '@faker-js/faker'
import axios from 'axios'

// Mockando a função post do axios para que ela simule o envio de dados para pegar o resultado
export const mockedAxiosResult = (): any => ({
  statusCode: faker.number.int,
  // Um body qualquer, tanto faz o conteudo aqui
  body: faker.helpers.objectEntry({
    key: faker.string.uuid()
  })
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  // Usando o mockResolvedValue para simular o envio de dados para pegar o resultado como resultado resolvido, passando um falso retorno, com um body e um statusCode so para testar

  // Mock clear para limpar o mock do axios de qualquer chamada anterior nos testes
  mockedAxios.post.mockClear().mockResolvedValue(mockedAxiosResult())

  mockedAxios.get.mockClear().mockResolvedValue(mockedAxiosResult())

  return mockedAxios
}
