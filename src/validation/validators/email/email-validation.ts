import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}
  validate(input: object): Error | null {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // Se não tiver valor no campo ou com erro de email, retorna um erro, senão retorna null
    // return emailRegex.test(fieldValue)
    //   ? null
    //   : new InvalidFieldError(this.fieldName)
    console.log(input[this.fieldName])
    // Se não tiver valor no campo ou o email for valido, retorna null, senão retorna um erro
    const isValid =
      !input[this.fieldName] || emailRegex.test(input[this.fieldName])
    return isValid ? null : new InvalidFieldError(this.fieldName)
  }
}
