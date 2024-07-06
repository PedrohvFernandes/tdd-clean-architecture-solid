// Aqui o describe ele usa o Mocha.SuiteFunction para descrever os testes. Para funcionar precisamos criar um arquivo de tsconfig.json na pasta cypress e ter o compilerOptions com cypress.

// Esses são testes de integração E2E, porque estamos testando o fluxo completo da aplicação diretamente no front, nossa tela comunicando diretamente com a API. O que é diferente de testes unitários que testam uma unidade de código, como uma função, um componente, uma classe, etc.

import { ConfigRoute } from '../../../../config'
import * as FormHelper from '../support/form-helper'
import * as Http from './login-mocks'

import { faker } from '@faker-js/faker'

const baseUrl = Cypress.config().baseUrl

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))

  cy.getByTestId('submit').click()
}

describe('Login', () => {
  // Como sempre iremos fazer isso antes de cada teste, podemos usar o beforeEach para fazer isso.
  beforeEach(() => {
    // Chamando antes de mocar
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
    FormHelper.testInputStatus('email', 'Campo obrigatório: email 🔴')

    cy.getByTestId('password').should('have.attr', 'readonly')
    FormHelper.testInputStatus('password', 'Campo obrigatório: password 🔴')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    // Como nosso campo esta readonly, precisamos fazer um focus para sumir com a propriedade readonly e poder digitar algo nele.
    cy.getByTestId('email').focus().type(faker.word.adverb())
    FormHelper.testInputStatus('email', 'O campo email é inválido 🔴')

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(3))
    FormHelper.testInputStatus(
      'password',
      'Tamanho mínimo: 5, campo invalido 🔴'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    FormHelper.testInputStatus('password')

    // O not.have.attr é uma função do cypress que verifica se o atributo não existe. No caso o disabled. Porque se o botão não esta desabilitado, ele não tem o atributo disabled e o mesmo vale para qualquer atributo que não exista, ou seja, que não esta preenchido ou usado
    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()

    simulateValidSubmit()

    // Estou procurando um elemento dentro de outro elemento. Primeiro eu entro no pai e depois procuro o filho(s). Eu olho se o ellipsis esta aparecendo e se o main-error não esta aparecendo e depois verifico se o ellipsis não esta aparecendo e o main-error esta aparecendo.
    // cy.getByTestId('error-wrap')
    //   .getByTestId('ellipsis')
    //   .should('exist')
    //   .getByTestId('main-error')
    //   .should('not.exist')
    //   .getByTestId('ellipsis')
    //   .should('not.exist')
    //   .getByTestId('main-error')
    //   .should('exist')
    // // .should(
    // //   'contain.text',
    // //   'Algo de errado aconteceu. Tente novamente em breve.' // Credenciais inválidas
    // // )
    FormHelper.testMainError('Credenciais inválidas')

    // Eq(equal) é uma função do cypress que verifica se a url é igual a que passamos para ela.
    FormHelper.testUrl(baseUrl, ConfigRoute.fourDev.login.path)
  })
  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    // Eq(equal) é uma função do cypress que verifica se a url é igual a que passamos para ela.
    FormHelper.testUrl(baseUrl, ConfigRoute.fourDev.login.path)
  })

  it('Should present UnexpectedError if invalid data if returned', () => {
    // Moca a requisição para o login
    Http.mockOkInvalidData()
    simulateValidSubmit()

    // cy.getByTestId('submit').click()

    FormHelper.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    )

    FormHelper.testUrl(baseUrl, ConfigRoute.fourDev.login.path)
  })

  // Aqui para testar precisa ter um backend rodando, porque ele vai fazer uma requisição para o backend. Pode ser o back local. Lembrando que a url da API fica no arquivo factories>http>api-url-factory.ts Ou pode fazer um Trade-off e discutir se faz ou não um mock aqui no cypress para retornar um valor fixo da API  para so testar o fluxo, evitando a dependência do backend, se a Api estiver fora do ar, o teste vai  passar.
  it('Should present save accessToken if valid credentials are provided', () => {
    // Moca a requisição para o login
    Http.mockOk()

    simulateValidSubmit()

    // cy.getByTestId('ellipsis').should('not.exist')
    // cy.getByTestId('main-error').should('not.exist')

    // Como no codigo do componente eu retiro deles da tela, ou seja, não renderizo, não tem como eu fazer dessa maneira, então eu faço de outra maneira.
    // cy.getByTestId('error-wrap').should('not.have.descendants')
    cy.getByTestId('error-wrap').should('not.exist')

    FormHelper.testUrl(baseUrl, ConfigRoute.fourDev.default.source.path)

    FormHelper.testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    const delayMs = 100

    Http.mockOk(delayMs)

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    // Dbclick é um clique duplo, ele vai tentar fazer duas requisições ao mesmo tempo.
    // cy.getByTestId('submit').dblclick()
    cy.getByTestId('submit').click()
    cy.getByTestId('submit').should('be.disabled')
    cy.getByTestId('submit').click({ force: true })
    // cy.wait('@request')

    // @request.all um atalho dentro do request, ele faz uma contagem de quantas requisições foram feitas.
    // Aqui ele verifica se foi feita uma requisição.
    FormHelper.testHttpCallsCount(1)
  })

  it('Should not call submit if form is invalid', () => {
    Http.mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}') // Esse comando simula o enter

    // cy.getByTestId('submit').click()

    FormHelper.testHttpCallsCount(0)
  })
})
