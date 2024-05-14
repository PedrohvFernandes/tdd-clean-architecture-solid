// Testando o validation em si
import { RequiredFieldValidation } from './required-field-validation'

import { RequiredFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

// Factory do validade de campo obrigatorio
// const makeSutRequiredFieldValidation = (): RequiredFieldValidation =>
//   new RequiredFieldValidation(faker.database.column())

type SutTypes = {
  sutRequiredFieldValidation: RequiredFieldValidation
  randomFieldName: string
}

const makeSutRequiredFieldValidation = (): SutTypes => {
  const randomFieldName = faker.database.column()
  const sutRequiredFieldValidation = new RequiredFieldValidation(
    randomFieldName
  )
  return {
    sutRequiredFieldValidation,
    randomFieldName
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    // Validamos algum campo, ex: email... nesse passamos um random de database(database) direto para o RequiredFieldValidation
    const { sutRequiredFieldValidation, randomFieldName } =
      makeSutRequiredFieldValidation()
    // Passamos um campo vazio para o validador desse campo aleatorio
    const error = sutRequiredFieldValidation.validate('')
    expect(error).toEqual(new RequiredFieldError(randomFieldName))
  })

  test('Should return falsy if field is not empty', () => {
    const { sutRequiredFieldValidation } = makeSutRequiredFieldValidation()
    // Validamos se contem um valor nesse campo aleatorio. Pode ser qualquer informação, so não pode ser vazio
    const error = sutRequiredFieldValidation.validate(faker.word.adjective())
    expect(error).toBeFalsy()
  })
})
