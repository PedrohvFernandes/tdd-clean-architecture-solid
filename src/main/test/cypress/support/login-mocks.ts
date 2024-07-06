import * as Helper from './http-mocks'

import { faker } from '@faker-js/faker'

export const mockInvalidCredentialsError = (): void =>
  Helper.mockInvalidCredentialsError(/login/)

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(/login/, 'POST')

export const mockOk = (delay: number = 0): void =>
  Helper.mockOk(
    /login/,
    'POST',
    { accessToken: faker.string.uuid() },
    'request',
    delay
  )

export const mockOkInvalidData = (): void =>
  Helper.mockOk(
    /login/,
    'POST',
    { invalidProperty: faker.string.uuid() },
    'request'
  )
