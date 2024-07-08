import * as Helper from './http-mocks'

import { faker } from '@faker-js/faker'

export const mockEmailInUseError = (): void =>
  Helper.mockEmailInUseError(/signup/)

export const mockUnexpectedError = (): void =>
  Helper.mockUnexpectedError(/signup/, 'POST')

export const mockOkInvalidData = (): void =>
  Helper.mockOk(
    /signup/,
    'POST',
    { invalidProperty: faker.string.uuid() },
    'request'
  )

export const mockOk = (delay: number = 0): void =>
  Helper.mockOk(
    /signup/,
    'POST',
    { accessToken: faker.string.uuid() },
    'request',
    delay
  )
