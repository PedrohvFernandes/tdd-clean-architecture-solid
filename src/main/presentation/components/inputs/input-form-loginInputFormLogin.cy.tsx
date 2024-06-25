import React from 'react'

import { InputFormLogin } from './input-form-login'

describe('<InputFormLogin />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InputFormLogin />)
  })
})
