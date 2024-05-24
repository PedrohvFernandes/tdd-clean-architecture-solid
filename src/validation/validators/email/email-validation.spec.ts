// Eu tenho tres alternativas para testar o EmailValidation:
// 1. Testar o email com libs de terceiros na camada de infra, ou seja, montaríamos os testes, iramos colocar um protocolo(interface) de email aqui nessa camada, pois não testaríamos diretamente aqui, mas usaríamos os testes de integração para testar a camada de infra, usando a lib de validação(yup, zod, etc) através das interfaces que criamos. E por se tratar da camada de infra, ela pode ter as libs que forem necessarias para rodarem a aplicação, como por exemplo, o axios, yup, etc
// 2. Testar o email com libs de terceiros na camada de validação(Pior dos casos, pois a camada de validação ficaria acoplada a lib de validação em si)m, seria o mais facil, mas não é o ideal
// 3. Testar o email com regex(expressão regular) na camada de validação, ou seja, a validação do email seria feita diretamente aqui, por nós mesmos

// Nesse caso optamos por fazer a 3, por ser algo mais simples de fazer

// Caso no projeto usemos a lib yup, por exemplo, para validar o email, teríamos que usar a primeira opção, porque dessa forma iriamos usar uma lib para validar, mas a camada de validation não ficaria acoplada a lib de validação em si. Mas como não temos a lib yup no projeto, vamos fazer a terceira opção, que é mais simples de fazer

import { EmailValidation } from './email-validation'

import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sutEmailValidation: EmailValidation
  randomFieldName: string
}

const makeSut = (): SutTypes => {
  const randomFieldName = faker.database.column()
  const sutEmailValidation = new EmailValidation(randomFieldName)
  return {
    sutEmailValidation,
    randomFieldName
  }
}

describe('EmailValidation', () => {
  // test('Should return error if email is empty', () => {
  //   const sut = makeSut()
  //   // Passando um email vazio
  //   const error = sut.sutEmailValidation.validate('')
  //   expect(error).toEqual(new InvalidFieldError(sut.randomFieldName))
  // })
  test('Should return falsy if email is empty', () => {
    const sut = makeSut()
    // Passando um email vazio
    const error = sut.sutEmailValidation.validate({
      [sut.randomFieldName]: ''
    })
    // Se o campo estiver vazio não precisa retornar erro
    expect(error).toBeFalsy()
  })
  // Validamos se o email passado é valido, mas nesse caso vai ser invalido
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    // Passando uma palavra aleatoria, que não é um email
    const error = sut.sutEmailValidation.validate({
      [sut.randomFieldName]: faker.word.adjective()
    })
    expect(error).toEqual(new InvalidFieldError(sut.randomFieldName))
  })

  // Validamos se o email passado é valido, mas nesse caso vai ser valido
  test('Should return falsy if email is invalid', () => {
    const sut = makeSut()
    // Validando com email real
    const error = sut.sutEmailValidation.validate({
      [sut.randomFieldName]: faker.internet.email()
    })
    expect(error).toBeFalsy()
  })
})
