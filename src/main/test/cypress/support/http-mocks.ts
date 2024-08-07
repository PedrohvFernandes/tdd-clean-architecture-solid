import { faker } from '@faker-js/faker'
import { Method } from 'cypress/types/net-stubbing'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  // Mocando
  // https://github.com/jhipster/generator-jhipster/issues/13345
  // Expressão regular para interceptar qualquer requisição que tenha login no meio da url, qualquer url que tenha login no meio, ele vai interceptar.
  // cy.intercept('POST', '**/login', { --> **/login é uma string
  // cy.intercept('POST', /login/, { --> /login/ é uma expressão regular
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.word.adjective()
    }
  })
}

export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 403,
    body: {
      error: faker.word.adjective()
    }
  })
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.arrayElement([400, 404, 500]),
    body: {
      error: faker.word.adjective()
    }
  })
}

export const mockOk = (
  url: RegExp,
  method: Method,
  body: any,
  aliasRequest: string = 'request',
  delay: number = 0
): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body,
    delay
  }).as(aliasRequest) // Alias(apelido) para a requisição
}
