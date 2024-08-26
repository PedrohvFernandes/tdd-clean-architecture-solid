import { ConfigRoute } from '../../../../config'
import * as Helper from '../utils/helpers'
describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    Helper.testUrl(ConfigRoute.fourDev.login.path)
  })
})
