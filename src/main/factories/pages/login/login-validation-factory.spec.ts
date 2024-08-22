import { makeLoginValidation } from './login-validation-factory'

import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
// import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('LoginValidationFactory', () => {
  // Garante que o factory está retornando o ValidationComposite com as validações corretas, com os campos corretos, e com as validações corretas
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5)
        // ...ValidationBuilder.field('email').required().email().build(),
        // ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})
