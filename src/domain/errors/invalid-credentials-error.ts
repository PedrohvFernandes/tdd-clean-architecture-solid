export class InvalidCredentialsError extends Error {
  constructor() {
    // Mensagem de erro que ira aparecer
    super('Credenciais inválidas')
    // Nome do erro, essa propriedade name vem da classe Error
    this.name = 'InvalidCredentialsError'
  }
}
