// import { ValidationBuilder } from '../builder/validation-builder'
import { ValidationComposite } from './validation-composite'

import { FieldValidationSpy } from '@/validation/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sutComposite: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (
  fieldName: string,
  // Vamos deixar os validadores fixos, não iremos usar o builder de validadores aqui no test do composite
  fieldValidationSpy: FieldValidationSpy[] = [
    // new FieldValidationSpy('any_field'),
    // new FieldValidationSpy('any_field')
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
): SutTypes => {
  const fieldValidationsSpy = fieldValidationSpy
  // const sutComposite = new ValidationComposite(fieldValidationsSpy)
  // Transformamos o composite em build também,  dois design patterns em um. So por questões de semântica. Com iso não conseguimos instanciar o objeto da classe de composite por aqui, mas somente dentro dela mesma como no build de validadores da pasta de builder
  const sutComposite = ValidationComposite.build(fieldValidationsSpy)

  // Seria mais ou menos isso aqui caso se usássemos o build dos validadores aqui no test: usamos o spread nós dois, porque eles retornam array das validações dos campos, com isso, concatenamos um array no outro, formando um só que é o que o composite espera, ele espera um array com itens que seja do tipo FieldValidation, ou seja, somente validadores com os nomes do campo que sera validado e dentro de cada array desse contem FieldValidation, ou seja, validadores dos campos passados para o field, ex: email e password. Ou seja, para o password ele retorna um array com  a validação de ser obrigatório e no mínimo 5, no fim o build dele retorna esse array(lista) desses validadores com a campo password, concatenamos com os de email, formando um so array de validadores para cada campo. Se não tivéssemos o build, iriamos ter que fazer um  new RequiredFieldValidation(password), new MinLengthValidation(password, 5), e o mesmo para o email, dentro de cada array, um para o password, outro para o email, e depois passar esses respectivos arrays para o build do composite. Podemos usar de exemplo o fieldValidationSpy que contem dois validadores com o fieldName de forma genérica, onde dentro do array dele instanciamos duas classes de validadores. Dessa forma formamos um schema tipo do zod, yup...

  // const sutComposite = ValidationComposite.build([
  //   ...ValidationBuilder.field('email').required().email().build(),
  //   ...ValidationBuilder.field('password').required().min(5).build()
  // ])

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
