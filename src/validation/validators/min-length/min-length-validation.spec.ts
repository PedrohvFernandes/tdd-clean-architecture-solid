import { MinlengthFieldError } from '@/validation/errors/minlength-invalid-field-error'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    // Testamos o campo "field" e o valor minimo de caracteres é 5
    const minLength = 5
    const sut = new MinLengthValidation('field', minLength)
    // Passamos um valor de 3 caracteres
    const error = sut.validate('123')
    expect(error).toEqual(new MinlengthFieldError(minLength))
  })
})
