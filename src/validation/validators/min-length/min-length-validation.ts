import { MinlengthFieldError } from '@/validation/errors/minlength-invalid-field-error'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    // Essa propriedade/atributo é exclusivo dessa classe, por isso é privado
    private readonly minLength: number
  ) {}

  validate(fieldValue: string): Error | null {
    return fieldValue ? new MinlengthFieldError(this.minLength) : null
  }
}
