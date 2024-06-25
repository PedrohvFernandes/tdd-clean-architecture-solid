// Aqui o describe ele usa o Mocha.SuiteFunction para descrever os testes. Para funcionar precisamos criar um arquivo de tsconfig.json na pasta cypress e ter o compilerOptions com cypress.
describe('Login', () => {
  it('Should load with correct initial state', () => {
    cy.visit('login')
  })
})
