// Testando o validation em si
import { CompareFieldsValidation } from './compare-fields-validation'

import { InvalidFieldToCompareError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sutCompareFieldsValidation: CompareFieldsValidation
  randomFieldName: string
}

const makeSutCompareFieldsValidation = (fieldToCompare: string): SutTypes => {
  const randomFieldName = 'other_field'
  const sutCompareFieldsValidation = new CompareFieldsValidation(
    randomFieldName,
    fieldToCompare
  )
  return {
    sutCompareFieldsValidation,
    randomFieldName
  }
}

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldToCompare = 'any_field'
    const { sutCompareFieldsValidation, randomFieldName } =
      makeSutCompareFieldsValidation(fieldToCompare)

    const error = sutCompareFieldsValidation.validate({
      [randomFieldName]: 'any_value',
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(
      new InvalidFieldToCompareError(randomFieldName, fieldToCompare)
    )
  })

  test('Should return falsy if  compare is valid', () => {
    const fieldToCompare = 'any_field'
    const value = faker.word.adjective()
    const { sutCompareFieldsValidation, randomFieldName } =
      makeSutCompareFieldsValidation(fieldToCompare)

    const error = sutCompareFieldsValidation.validate({
      [randomFieldName]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
