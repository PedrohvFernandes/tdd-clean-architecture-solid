// Helpers são funções que ajudam a testar a aplicação de forma mais fácil e rápida. Esses são genericos
const baseUrl = Cypress.config().baseUrl

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
