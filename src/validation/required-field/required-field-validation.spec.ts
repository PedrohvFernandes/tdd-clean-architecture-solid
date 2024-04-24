import { RequiredFieldError } from '../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    // Validamos o campo email
    const sut = new RequiredFieldValidation('email')
    // Passamos um campo vazio para o validador de email
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
