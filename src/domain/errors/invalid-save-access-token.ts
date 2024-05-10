export class InvalidSaveAccessToken extends Error {
  constructor() {
    super('Erro ao salvar o token')
    this.name = 'InvalidSaveAccessToken'
  }
}
