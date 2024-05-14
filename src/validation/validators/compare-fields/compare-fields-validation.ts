import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly valueToCompare: string
  ) {}

  validate(fieldValue: string): Error | null {
    return fieldValue !== this.valueToCompare
      ? new InvalidFieldError(this.fieldName)
      : null
  }
}
