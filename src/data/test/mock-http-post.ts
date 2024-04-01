/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpPostParams } from '../protocols/http'

import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.helpers.objectEntry({
    key: faker.string.uuid()
  })
})
