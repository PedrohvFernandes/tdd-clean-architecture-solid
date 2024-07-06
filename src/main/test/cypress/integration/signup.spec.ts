import * as FormHelper from '../support/form-helper'

import { faker } from '@faker-js/faker'

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
})
