// Aqui o describe ele usa o Mocha.SuiteFunction para descrever os testes. Para funcionar precisamos criar um arquivo de tsconfig.json na pasta cypress e ter o compilerOptions com cypress.

// Esses são testes de integração E2E, porque estamos testando o fluxo completo da aplicação diretamente no front, nossa tela comunicando diretamente com a API. O que é diferente de testes unitários que testam uma unidade de código, como uma função, um componente, uma classe, etc.

import { faker } from '@faker-js/faker'

const baseUrl = Cypress.config().baseUrl

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

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tamanho mínimo: 5, campo invalido')
      .should('contain.text', '🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo Certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    cy.getByTestId('password-status').should(
      'have.attr',
      'title',
      'Tudo Certo!'
    )

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo Certo!')
      .should('contain.text', '🟢')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error if invalid credentials are provider', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))

    cy.getByTestId('submit').click()

    // Estou procurando um elemento dentro de outro elemento. Primeiro eu entro no pai e depois procuro o filho(s). Eu olho se o ellipsis esta aparecendo e se o main-error não esta aparecendo e depois verifico se o ellipsis não esta aparecendo e o main-error esta aparecendo.
    cy.getByTestId('error-wrap')
      .getByTestId('ellipsis')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('ellipsis')
      .should('not.exist')
      .getByTestId('main-error')
      .should('exist')
    // .should(
    //   'contain.text',
    //   'Algo de errado aconteceu. Tente novamente em breve.' // Credenciais inválidas
    // )

    // Eq(equal) é uma função do cypress que verifica se a url é igual a que passamos para ela.
    cy.url().should('eq', `${baseUrl}/login`)
  })

  // Aqui para testar precisa ter um backend rodando, porque ele vai fazer uma requisição para o backend. Pode ser o back local. Lembrando que a url da API fica no arquivo factories>http>api-url-factory.ts Ou pode fazer um Trade-off e discutir se faz ou não um mock aqui no cypress para retornar um valor fixo da API  para so testar o fluxo, evitando a dependência do backend.
  it('Should present save accessToken if valid credentials are provided', () => {
    cy.getByTestId('email').focus().type('mango@gmail.com')
    cy.getByTestId('password').focus().type('12345')

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrap')
      .getByTestId('ellipsis')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('ellipsis')
      .should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)

    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem('accessToken'))
    })
  })
})
