import { RequiredFieldError } from '../errors'
import { RequiredFieldValidation } from './required-field-validation'

import { faker } from '@faker-js/faker'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    // Validamos o campo email
    const sut = new RequiredFieldValidation('email')
    // Passamos um campo vazio para o validador de email
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')
    // Validamos se contem um valor no campo email
    const error = sut.validate(faker.internet.email())
    // Se não retornar erro, então o campo é valido
    expect(error).toBeFalsy()
  })
})
