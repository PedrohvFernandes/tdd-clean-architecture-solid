import { FieldValidation } from '@/validation/protocols'

// Validador fake para testar o composite. Tipo um required-field-validation, ele valida se o campo é obrigatório ou não
export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null
  constructor(readonly fieldName: string) {}
  validate(input: object): Error | null {
    console.log('input', input)
    // Por padrão ele não possui erro, é um null. O erro colocamos no teste quando mockamos o spy
    return this.error
  }
}
