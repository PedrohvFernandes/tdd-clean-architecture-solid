import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly valueToCompare: string
  ) {}

  validate(fieldValue: string): Error | null {
    console.log(this.valueToCompare)
    return fieldValue !== this.fieldName
      ? new InvalidFieldError(this.fieldName)
      : null
  }
}
