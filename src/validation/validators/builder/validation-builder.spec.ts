import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'
import { ValidationBuilder as sut } from './validation-builder'

import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation
} from '@/validation/validators'
import { faker } from '@faker-js/faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column()
    // Um campo pode ter mais de uma validação, e para isso eu chamo o metodo field, passando o nome do campo, e depois chamo o metodo required, que é uma validação de campo obrigatório, e no final chamo o metodo build, que vai retornar um array de validações. Apos o required poderia chamar outros metodos para testar outras validações, nesse caso so testamos o required desse campo especifico(Ex: any_field).
    const validations = sut.field(fieldName).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)])
  })

  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column()

    const validations = sut.field(fieldName).email().build()
    expect(validations).toEqual([new EmailValidation(fieldName)])
  })

  test('Should return MinLengthValidation', () => {
    const fieldName = faker.database.column()
    const length = Number(faker.string.numeric())

    const validations = sut.field(fieldName).min(length).build()
    expect(validations).toEqual([new MinLengthValidation(fieldName, length)])
  })

  test('Should return CompareFieldsValidation', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()

    const validations = sut.field(fieldName).sameAs(fieldToCompare).build()
    expect(validations).toEqual([
      new CompareFieldsValidation(fieldName, fieldToCompare)
    ])
  })

  // Teste para validar se o metodo build esta retornando uma lista de validações, e não apenas uma validação para aquele campo(ex: any_field) que esta sendo testado.
  test('Should return a list of validations', () => {
    const fieldName = faker.database.column()
    const length = Number(faker.string.numeric())

    const validations = sut
      .field(fieldName)
      .required()
      .min(length)
      .email()
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, length),
      new EmailValidation(fieldName)
    ])
  })
})
