import { ConfigRoute } from '../../../../config'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSuccess = (): void => Http.mockOk(path, 'GET', 'surveys-list')

describe('Private Routes', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helper.setLocalStorageItem('account', account)
    })

    cy.visit('')
  })
  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    Helper.testUrl(ConfigRoute.fourDev.login.path)
  })

  it('Should present correct username', () => {
    mockUnexpectedError()
    const { name } = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.getByTestId('logout').click()
    Helper.testUrl(ConfigRoute.fourDev.login.path)
  })

  it('Should present survey items', () => {
    mockSuccess()
    // Ele usa o Jquery por tras do panos para pegar o elemento e verificar se ele tem a quantidade de elementos que esperamos.
    cy.get('li>footer:empty').should('have.length', 4) // Ele espera que tenha 4 elementos vazios que é o nossos skeleton
    cy.get('li:not(:empty)').should('have.length', 2) // Ele espera que tenha 2 elementos não vazios que é o nosso survey no mock
    // O CY retora a li do jquery
    cy.get('li:nth-child(1)').then((li) => {
      // O find pega um elemento dentro do li. O find retorna um objeto do jquery, com isso pegamos o texto do elemento
      assert.equal(li.find('[data-testid="day"]').text(), '01')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2021')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icons').then((icons) => {
        assert.equal(
          li.find('[data-testid="icon"]').attr('src'),
          icons.THUMBS_UP
        )
      })
    })

    cy.get('li:nth-child(2)').then((li) => {
      // O find pega um elemento dentro do li. O find retorna um objeto do jquery, com isso pegamos o texto do elemento
      assert.equal(li.find('[data-testid="day"]').text(), '02')
      assert.equal(li.find('[data-testid="month"]').text(), 'out')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icons').then((icons) => {
        assert.equal(
          li.find('[data-testid="icon"]').attr('src'),
          icons.THUMBS_DOWN
        )
      })
    })
  })
})
