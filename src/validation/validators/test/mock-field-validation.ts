import { FieldValidation } from '@/validation/protocols'

// Validador fake para testar o composite
export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null
  constructor(readonly fieldName: string) {}
  validate(): Error | null {
    // Por padrão ele não possui erro, é um null. O erro colocamos no teste quando mockamos o spy
    return this.error
  }
}
