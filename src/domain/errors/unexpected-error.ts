export class UnexpectedError extends Error {
  constructor() {
    // Mensagem de erro que ira aparecer
    super('Algo de errado aconteceu. Tente novamente em breve.')
    // Nome do erro, essa propriedade name vem da classe Error
    this.name = 'UnexpectedError'
  }
}
