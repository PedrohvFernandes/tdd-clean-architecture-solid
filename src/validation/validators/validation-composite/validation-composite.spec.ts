import { ValidationComposite } from './validation-composite'

import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sutComposite: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (
  fieldName: string,
  fieldValidationSpy: FieldValidationSpy[] = [
    // new FieldValidationSpy('any_field'),
    // new FieldValidationSpy('any_field')
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
): SutTypes => {
  const fieldValidationsSpy = fieldValidationSpy
  const sutComposite = new ValidationComposite(fieldValidationsSpy)
  return {
    sutComposite,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  // Como foi dito antes o composite possui o seus filhos, ou seja, um monte de validadores dentro dele, caso algum deles falhar, ele precisa falhar também e retornar o erro
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sutComposite, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.word.adverb()
    // O primeiro validador não possui erro, esta com sucesso. Esses validadores é como o emailValidation...
    // O segundo validador possui erro. Logo o composite precisa falhar
    fieldValidationsSpy[1].error = new Error(errorMessage)

    // O valor em si não faz diferença. Eu to testando a validação de um validador de campo especifico(fieldName ex: any_field), então se eu não tiver nem um validador(Spy) que ta validando esse campo(fieldName) o composite não vai validar ninguem. Então ele tem que validar somente os campos do nome passado do campo aqui. E cada validate valida um campo especifico(fieldName, ex: any_field), com isso aqui no composite eu preciso validar o campo especifico que eu to passando aqui atraves do fieldName,se eu não passar nada, ele não valida nem um dos validadores com o seu nome especifico(fieldName). Então se qualquer um dos validadores falhar, ou seja, retornar um erro  o composite tem que falhar também
    // O valor não importa, porque so queremos testas se aquele validador especifico(fieldName) possui erro ou não quando criarmos ele e popularizarmos ele com um erro ou não
    const error = sutComposite.validate(fieldName, faker.word.adverb())
    expect(error).toBe(errorMessage)
  })

  // Se o primeiro ja falhar, o segundo não deve ser chamado
  test('Should return error if first validation fails', () => {
    const fieldName = faker.database.column()
    const { sutComposite, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.word.adverb()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.word.adverb())

    const error = sutComposite.validate(fieldName, faker.word.adverb())
    expect(error).toBe(errorMessage)
  })

  // Caso de sucesso
  test('Should return success validation', () => {
    const fieldName = faker.database.column()
    const { sutComposite } = makeSut(fieldName)

    const error = sutComposite.validate(fieldName, faker.word.adverb())
    expect(error).toBeFalsy()
  })
})
