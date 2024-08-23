import * as Http from './http-mocks'

import { faker } from '@faker-js/faker'

export const mockEmailInUseError = (): void =>
  Http.mockForbiddenError(/signup/, 'POST')

export const mockUnexpectedError = (): void =>
  Http.mockServerError(/signup/, 'POST')

export const mockOk = (delay: number = 0): void =>
  Http.mockOk(
    /signup/,
    'POST',
    { accessToken: faker.string.uuid() },
    'request',
    delay
  )
