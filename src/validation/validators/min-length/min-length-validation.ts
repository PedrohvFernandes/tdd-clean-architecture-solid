import { MinlengthFieldError } from '@/validation/errors/minlength-invalid-field-error'
import { FieldValidation } from '@/validation/protocols'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    // Essa propriedade/atributo é exclusivo dessa classe, por isso é privado
    private readonly minLength: number
  ) {}

  validate(input: object): Error | null {
    // Se não tiver o campo ou o campo for menor que o minimo de caracteres, retorna um erro, senão retorna null
    return input[this.fieldName]?.length < this.minLength
      ? new MinlengthFieldError(this.minLength)
      : null
  }
}
