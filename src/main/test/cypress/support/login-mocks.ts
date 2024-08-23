import * as Http from './http-mocks'

import { faker } from '@faker-js/faker'

export const mockInvalidCredentialsError = (): void =>
  Http.mockUnauthorizedError(/login/)

export const mockUnexpectedError = (): void =>
  Http.mockServerError(/login/, 'POST')

export const mockOk = (delay: number = 0): void =>
  Http.mockOk(
    /login/,
    'POST',
    {
      accessToken: faker.string.uuid(),

      name: faker.internet.displayName()
    },
    'request',
    delay
  )
