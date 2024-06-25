// Com essa declaração de modulo -->Para ele entender que dentro do cypress esse chainable que é o tipo dele, a gente adicionou um outro tipo que é o getByTestId que é uma função que recebe uma string e retorna um chainable de elemento. Assim, o cypress entende que ele pode usar o getByTestId como uma função do cypress.
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getByTestId('email-status')
     */
    getByTestId(id: string): Chainable<Element>
  }
}
