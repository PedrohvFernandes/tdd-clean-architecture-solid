export class RequiredFieldError extends Error {
  constructor(fieldName: string) {
    super(`Campo obrigatório: ${fieldName}`)
    this.name = 'RequiredFieldError'
  }
}
