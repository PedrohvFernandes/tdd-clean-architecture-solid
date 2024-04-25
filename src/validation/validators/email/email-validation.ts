import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor(readonly fieldName: string) {}
  validate(fieldValue: string): Error | null {
    return fieldValue ? null : new InvalidFieldError(this.fieldName)
  }
}