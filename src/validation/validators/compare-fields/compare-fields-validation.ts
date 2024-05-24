import { InvalidFieldToCompareError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly fieldName: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: object): Error | null {
    return input[this.fieldName] !== input[this.fieldToCompare]
      ? new InvalidFieldToCompareError(this.fieldName, this.fieldToCompare)
      : null
  }
}
