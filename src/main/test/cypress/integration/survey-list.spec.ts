import * as Helper from '../support/helpers'
import * as Http from '../support/survey-list-mocks'

import { faker } from '@faker-js/faker'
describe('Private Routes', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.string.uuid(),
      name: faker.internet.userName()
    })
    cy.visit('')
  })
  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })
})
