import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const mockedAxiosResult = {
    body: faker.helpers.objectEntry({
      key: faker.string.uuid()
    }),
    statusCode: faker.number.int
  }
  mockedAxios.post.mockResolvedValue(mockedAxiosResult)

  return mockedAxios
}
