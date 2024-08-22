import { makeSignupValidation } from './signup-validation-factory'

import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
  // ValidationComposite
} from '@/validation/validators'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'
// import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

describe('SignUpValidationFactory', () => {
  // Garante que o factory está retornando o ValidationComposite com as validações corretas, com os campos corretos, e com as validações corretas
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()
    // Tiramos o builder, porque não é ideal usar o mesmo codigo que esta em produção aqui nos testes. E caso o builder estiver com algum bug e compilando, o teste vai passar, ou seja, o teste vai mascarar isso e o teste vai continuar passando. Com isso, estamos passando as validações manualmente, para garantir que o teste vai falhar caso algo mude, sem passar o builder,.
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new MinLengthValidation('passwordConfirmation', 5),
        new CompareFieldsValidation('passwordConfirmation', 'password')
      ])
      // ValidationComposite.build([
      //   ...Builder.field('name').required().min(5).build(),
      //   ...Builder.field('email').required().email().build(),
      //   ...Builder.field('password').required().min(5).build(),
      //   ...Builder.field('passwordConfirmation')
      //     .required()
      //     .min(5)
      //     .sameAs('password')
      //     .build()
      // ])
    )
  })
})
