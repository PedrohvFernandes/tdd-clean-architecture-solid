import { ValidationComposite } from './validation-composite'

import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'

describe('ValidationComposite', () => {
  // Como foi dito antes o composite possui o seus filhos, ou seja, um monte de validadores dentro dele, caso algum deles falhar, ele precisa falhar também e retornar o erro
  test('Should return error if any validation fails', () => {
    // O primeiro validador não possui erro, esta com sucesso. Esses validadores é como o emailValidation...
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    // O segundo validador possui erro. Logo o composite precisa falhar
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('any_error_message')

    // Injetamos os dois validadores
    const sutComposite = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    // O valor em si não faz diferença. Eu to testando a validação de um validador de campo especifico(fieldName ex: any_field), então se eu não tiver nem um validador(Spy) que ta validando esse campo(fieldName) o composite não vai validar ninguem. Então ele tem que validar somente os campos do nome passado do campo aqui. E cada validate valida um campo especifico(fieldName, ex: any_field), com isso aqui no composite eu preciso validar o campo especifico que eu to passando aqui atraves do fieldName,se eu não passar nada, ele não valida nem um dos validadores com o seu nome especifico(fieldName). Então se qualquer um dos validadores falhar, ou seja, retornar um erro  o composite tem que falhar também
    // O valor não importa, porque so queremos testas se aquele validador especifico(fieldName) possui erro ou não quando criarmos ele e popularizarmos ele com um erro ou não
    const error = sutComposite.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })
})
