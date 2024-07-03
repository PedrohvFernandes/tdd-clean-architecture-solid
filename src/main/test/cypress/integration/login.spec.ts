// Aqui o describe ele usa o Mocha.SuiteFunction para descrever os testes. Para funcionar precisamos criar um arquivo de tsconfig.json na pasta cypress e ter o compilerOptions com cypress.

// Esses são testes de integração E2E, porque estamos testando o fluxo completo da aplicação diretamente no front, nossa tela comunicando diretamente com a API. O que é diferente de testes unitários que testam uma unidade de código, como uma função, um componente, uma classe, etc.

import { faker } from '@faker-js/faker'

const baseUrl = Cypress.config().baseUrl

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

    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')

    cy.getByTestId('email')
      .should('have.attr', 'title', 'Campo obrigatório: email 🔴')
      .should('have.attr', 'readonly')

    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'Campo obrigatório: email 🔴'
    )

    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )

    cy.getByTestId('password')
      .should('have.attr', 'title', 'Campo obrigatório: password 🔴')
      .should('have.attr', 'readonly')

    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Campo obrigatório: password 🔴'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    // Como nosso campo esta readonly, precisamos fazer um focus para sumir com a propriedade readonly e poder digitar algo nele.
    cy.getByTestId('email').focus().type(faker.word.adverb())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')

    cy.getByTestId('email').should(
      'have.attr',
      'title',
      'O campo email é inválido 🔴'
    )

    cy.getByTestId('email-label').should(
      'have.attr',
      'title',
      'O campo email é inválido 🔴'
    )

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(3))
    cy.getByTestId('password-wrap').should(
      'have.attr',
      'data-status',
      'invalid'
    )

    cy.getByTestId('password').should(
      'have.attr',
      'title',
      'Tamanho mínimo: 5, campo invalido 🔴'
    )

    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Tamanho mínimo: 5, campo invalido 🔴'
    )

    cy.getByTestId('submit').should('have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')

    cy.getByTestId('email').should('have.attr', 'title', 'Tudo Certo! 🟢')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Tudo Certo! 🟢')

    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')

    cy.getByTestId('password').should('have.attr', 'title', 'Tudo Certo! 🟢')
    cy.getByTestId('password-label').should(
      'have.attr',
      'title',
      'Tudo Certo! 🟢'
    )

    // O not.have.attr é uma função do cypress que verifica se o atributo não existe. No caso o disabled. Porque se o botão não esta desabilitado, ele não tem o atributo disabled e o mesmo vale para qualquer atributo que não exista, ou seja, que não esta preenchido ou usado
    cy.getByTestId('submit').should('not.have.attr', 'disabled')

    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    // Mocando
    // https://github.com/jhipster/generator-jhipster/issues/13345
    // Expressão regular para interceptar qualquer requisição que tenha login no meio da url, qualquer url que tenha login no meio, ele vai interceptar.
    // cy.intercept('POST', '**/login', {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.word.adjective()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))

    cy.getByTestId('submit').click()

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
    cy.getByTestId('ellipsis').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should('contain.text', 'Credenciais inválidas')

    // Eq(equal) é uma função do cypress que verifica se a url é igual a que passamos para ela.
    cy.url().should('eq', `${baseUrl}/login`)
  })
  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', /login/, {
      statusCode: 400,
      body: {
        error: faker.word.adjective()
      }
    })

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('ellipsis').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )

    // Eq(equal) é uma função do cypress que verifica se a url é igual a que passamos para ela.
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError if invalid data if returned', () => {
    // Moca a requisição para o login
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.string.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.string.alphanumeric(5))
      .type('{enter}') // Esse comando simula o enter

    // cy.getByTestId('submit').click()

    cy.getByTestId('ellipsis').should('not.exist')
    cy.getByTestId('main-error')
      .should('exist')
      .should(
        'contain.text',
        'Algo de errado aconteceu. Tente novamente em breve.'
      )

    // Eq(equal) é uma função do cypress que verifica se a url é igual a que passamos para ela.
    cy.url().should('eq', `${baseUrl}/login`)
  })

  // Aqui para testar precisa ter um backend rodando, porque ele vai fazer uma requisição para o backend. Pode ser o back local. Lembrando que a url da API fica no arquivo factories>http>api-url-factory.ts Ou pode fazer um Trade-off e discutir se faz ou não um mock aqui no cypress para retornar um valor fixo da API  para so testar o fluxo, evitando a dependência do backend, se a Api estiver fora do ar, o teste vai  passar.
  it('Should present save accessToken if valid credentials are provided', () => {
    // Moca a requisição para o login
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('ellipsis').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)

    cy.window().then((window) => {
      assert.isOk(window.localStorage.getItem('accessToken'))
    })
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      },
      delay: 100 // Delay de 100ms
    }).as('request') // Alias(apelido) para a requisição
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
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.string.uuid()
      },
      delay: 100
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    // cy.getByTestId('submit').click()

    cy.get('@request.all').should('have.length', 0)
  })
})
