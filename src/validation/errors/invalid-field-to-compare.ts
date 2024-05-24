export class InvalidFieldToCompareError extends Error {
  constructor(fieldName: string, fieldToCompare: string) {
    super(
      `O campo ${fieldName} é inválido, ele deve ser igual ao campo ${fieldToCompare}`
    )
    this.name = 'InvalidFieldError'
  }
}
