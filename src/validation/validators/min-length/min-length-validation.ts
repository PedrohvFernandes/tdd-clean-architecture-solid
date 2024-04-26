import { MinlengthFieldError } from '@/validation/errors/minlength-invalid-field-error'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    // Essa propriedade/atributo é exclusivo dessa classe, por isso é privado
    private readonly minLength: number
  ) {}

  validate(fieldValue: string): Error | null {
    // Se o valor do campo for maior que o mininimo de caracteres, retorna nulo, ou seja, sem erro algum
    return fieldValue.length >= this.minLength
      ? null
      : new MinlengthFieldError(this.minLength)
  }
}
