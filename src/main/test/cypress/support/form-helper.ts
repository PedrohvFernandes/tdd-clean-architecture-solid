const baseUrl = Cypress.config().baseUrl

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

export const testHttpCallsCount = (
  count: number,
  aliasRequest: string = 'request'
): void => {
  cy.get(`@${aliasRequest}.all`).should('have.length', count)
}

export const testUrl = (path: string): void => {
  // O base url é a url base da aplicação que passamos no cypress.config.ts
  // Eq(equal) é uma função do cypress que verifica se a url é igual a que passamos para ela.
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then((window) => assert.isOk(window.localStorage.getItem(key)))
}
