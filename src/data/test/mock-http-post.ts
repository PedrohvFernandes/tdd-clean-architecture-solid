import { HttpPostParams } from '../protocols/http'

import { faker } from '@faker-js/faker'

// Mock para requisição para testar na parte de infra
export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectEntry({
    key: faker.string.uuid()
  })
})
