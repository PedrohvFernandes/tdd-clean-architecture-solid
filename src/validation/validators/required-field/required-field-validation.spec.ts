// Testando o validation em si
import { RequiredFieldValidation } from '../required-field/required-field-validation'

import { RequiredFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

// Factory do composite
const makeSutComposite = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    // Validamos algum campo, ex: email... nesse passamos um random de database(database) direto para o RequiredFieldValidation
    const sut = makeSutComposite()
    // Passamos um campo vazio para o validador desse campo aleatorio
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = makeSutComposite()
    // Validamos se contem um valor nesse campo aleatorio. Pode ser qualquer informação, so não pode ser vazio
    const error = sut.validate(faker.word.adjective())
    expect(error).toBeFalsy()
  })
})
