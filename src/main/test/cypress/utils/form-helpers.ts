export const testInputStatus = (field: string, error?: string): void => {
  cy.getByTestId(`${field}-wrap`).should(
    'have.attr',
    'data-status',
    error ? 'invalid' : 'valid'
  )

  const errorOrNotError = error ?? 'Tudo Certo! 🟢'

  cy.getByTestId(field).should('have.attr', 'title', errorOrNotError)

  cy.getByTestId(`${field}-label`).should('have.attr', 'title', errorOrNotError)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('ellipsis').should('not.exist')
  cy.getByTestId('main-error').should('exist').should('contain.text', error)
}
