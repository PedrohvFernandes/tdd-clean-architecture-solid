export class MinlengthFieldError extends Error {
  constructor(minLength: number) {
    super(`Tamanho mínimo: ${minLength}, campo invalido`)
    this.name = 'MinlengthFieldError'
  }
}
