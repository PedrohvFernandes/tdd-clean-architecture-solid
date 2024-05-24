// Testando o validation em si
import { CompareFieldsValidation } from './compare-fields-validation'

import { InvalidFieldToCompareError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sutCompareFieldsValidation: CompareFieldsValidation
  randomFieldName: string
}

const makeSutCompareFieldsValidation = (fieldToCompare: string): SutTypes => {
  const randomFieldName = faker.database.column()
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
    const fieldToCompare = faker.database.column()
    const { sutCompareFieldsValidation, randomFieldName } =
      makeSutCompareFieldsValidation(fieldToCompare)

    const error = sutCompareFieldsValidation.validate({
      [randomFieldName]: faker.word.adjective(),
      [fieldToCompare]: faker.word.adjective()
    })
    expect(error).toEqual(
      new InvalidFieldToCompareError(randomFieldName, fieldToCompare)
    )
  })

  test('Should return falsy if  compare is valid', () => {
    const fieldToCompare = faker.database.column()
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
