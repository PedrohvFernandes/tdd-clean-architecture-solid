import * as Http from './http-mocks'

export const mockUnexpectedError = (): void =>
  Http.mockServerError(/surveys/, 'POST')

export const mockAccessDeniedError = (): void =>
  Http.mockForbiddenError(/surveys/, 'POST')
