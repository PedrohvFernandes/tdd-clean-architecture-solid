// Testando o validation em si
import { CompareFieldsValidation } from './compare-fields-validation'

import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sutCompareFieldsValidation: CompareFieldsValidation
  randomFieldName: string
}

const makeSutCompareFieldsValidation = (valueToCompare: string): SutTypes => {
  const randomFieldName = faker.database.column()
  const sutCompareFieldsValidation = new CompareFieldsValidation(
    randomFieldName,
    valueToCompare
  )
  return {
    sutCompareFieldsValidation,
    randomFieldName
  }
}

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const { sutCompareFieldsValidation, randomFieldName } =
      makeSutCompareFieldsValidation(faker.word.adjective())

    const error = sutCompareFieldsValidation.validate(faker.word.adjective())
    expect(error).toEqual(new InvalidFieldError(randomFieldName))
  })
})
