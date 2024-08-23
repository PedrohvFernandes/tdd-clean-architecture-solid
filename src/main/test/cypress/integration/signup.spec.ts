import { ConfigRoute } from '../../../../config'
import * as FormHelper from '../support/form-helpers'
import * as Helper from '../support/helpers'
import * as Http from '../support/signup-mocks'

import { faker } from '@faker-js/faker'

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.internet.displayName())
  cy.getByTestId('email').focus().type(faker.internet.email())

  const password = faker.string.alphanumeric(7)

  cy.getByTestId('password').focus().type(password)
  FormHelper.testInputStatus('password')

  cy.getByTestId('passwordConfirmation').focus().type(password)
  FormHelper.testInputStatus('passwordConfirmation')
}

const simulateValidSubmit = (): void => {
  populateFields()

  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readonly')
    FormHelper.testInputStatus('name', 'Campo obrigatório: name 🔴')

    cy.getByTestId('email').should('have.attr', 'readonly')
    FormHelper.testInputStatus('email', 'Campo obrigatório: email 🔴')

    cy.getByTestId('password').should('have.attr', 'readonly')
    FormHelper.testInputStatus('password', 'Campo obrigatório: password 🔴')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
    FormHelper.testInputStatus(
      'passwordConfirmation',
      'Campo obrigatório: passwordConfirmation 🔴'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus('name', 'Tamanho mínimo: 5, campo invalido 🔴')

    cy.getByTestId('email').focus().type(faker.word.adverb())
    FormHelper.testInputStatus('email', 'O campo email é inválido 🔴')

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus(
      'password',
      'Tamanho mínimo: 5, campo invalido 🔴'
    )

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.string.alphanumeric(6))
    FormHelper.testInputStatus(
      'passwordConfirmation',
      'O campo passwordConfirmation é inválido, ele deve ser igual ao campo password 🔴'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.internet.displayName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.string.alphanumeric(5)

    cy.getByTestId('password').focus().type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()

    simulateValidSubmit()

    FormHelper.testMainError('Esse email já está em uso')
    Helper.testUrl(ConfigRoute.fourDev.signup.path)
  })

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    Helper.testUrl(ConfigRoute.fourDev.signup.path)
  })

  it('Should present account on localStorage if valid credentials are provided', () => {
    Http.mockOk()

    simulateValidSubmit()

    cy.getByTestId('error-wrap').should('not.exist')

    Helper.testUrl(ConfigRoute.fourDev.surveyList.path)

    Helper.testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    const delayMs = 100

    Http.mockOk(delayMs)

    populateFields()
    cy.getByTestId('submit').click()
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('submit').click({ force: true })

    Helper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helper.testHttpCallsCount(0)
  })
})
