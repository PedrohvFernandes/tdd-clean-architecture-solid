import { ConfigRoute } from '../../../../config'
import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/

const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')

const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

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
})
