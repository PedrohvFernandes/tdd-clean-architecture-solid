// O uso principal da pasta de support do cypress é para a gente criar comando customizados especifico para o cypress

// Cypress custom commands --> Criando um comando personalizado para o Cypress https://docs.cypress.io/api/cypress-api/custom-commands. No fim é um helper que pode ser usado em qualquer teste
Cypress.Commands.add('getByTestId', (id) => {
  return cy.get(`[data-testid=${id}]`)
})
