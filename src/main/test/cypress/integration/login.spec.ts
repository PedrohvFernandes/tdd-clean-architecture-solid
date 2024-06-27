// Aqui o describe ele usa o Mocha.SuiteFunction para descrever os testes. Para funcionar precisamos criar um arquivo de tsconfig.json na pasta cypress e ter o compilerOptions com cypress.

import { faker } from '@faker-js/faker'

describe('Login', () => {
  // Como sempre iremos fazer isso antes de cada teste, podemos usar o beforeEach para fazer isso.
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    // cy.get('[data-testid="email-status"]').should(
    //   // have.attr é uma função do cypress que verifica se o atributo do HTML existe. No caso o title.
    //   'have.attr',
    //   'title',
    //   'Campo obrigatório: email'
    // )

    // Usando o getByTestId que criamos no support/index.js e configuramos o type, a declaração de modulo dele em index.d.ts. Evitamos de ter que escrever o data-testid toda vez.
    cy.getByTestId('email').should('have.attr', 'readonly')

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório: email')
      .should('contain.text', '🔴')

    cy.getByTestId('password').should('have.attr', 'readonly')

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório: password')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    // Como nosso campo esta readonly, precisamos fazer um focus para sumir com a propriedade readonly e poder digitar algo nele.
    cy.getByTestId('email').focus().type(faker.word.adverb())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'O campo email é inválido')
      .should('contain.text', '🔴')

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(3))
    cy.getByTestId('password-status').should(
      'have.attr',
      'title',
      'Tamanho mínimo: 5, campo invalido'
    )
    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
