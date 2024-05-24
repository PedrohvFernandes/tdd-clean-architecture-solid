import { MinlengthFieldError } from '@/validation/errors/minlength-invalid-field-error'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sutMinLengthValidation: MinLengthValidation
  randomFieldName: string
  minLength: number
}

const makeSut = (min: number = 5): SutTypes => {
  const randomFieldName = faker.database.column()
  const minLength = min
  // Testamos o campo "aleatorio" e o valor minimo de caracteres é 5 ou mais, por padrão 5
  const sutMinLengthValidation = new MinLengthValidation(
    randomFieldName,
    minLength
  )
  return {
    sutMinLengthValidation,
    randomFieldName,
    minLength
  }
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const { minLength, sutMinLengthValidation, randomFieldName } = makeSut()
    // Passamos um valor de 3 caracteres
    const error = sutMinLengthValidation.validate({
      [randomFieldName]: faker.string.sample(3)
    })
    expect(error).toEqual(new MinlengthFieldError(minLength))
  })

  test('Should return falsy if value is valid', () => {
    const { sutMinLengthValidation, randomFieldName } = makeSut()
    const error = sutMinLengthValidation.validate({
      [randomFieldName]: faker.string.sample(5)
    })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field doesnt exists in schema', () => {
    const { sutMinLengthValidation } = makeSut()
    const error = sutMinLengthValidation.validate({
      [faker.database.column()]: faker.string.sample(5)
    })
    expect(error).toBeFalsy()
  })
})
