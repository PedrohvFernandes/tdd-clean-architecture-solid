import { makeSignupValidation } from './signup-validation-factory'

import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

describe('SignUpValidationFactory', () => {
  // Garante que o factory está retornando o ValidationComposite com as validações corretas, com os campos corretos, e com as validações corretas
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passwordConfirmation')
          .required()
          .min(5)
          .sameAs('password')
          .build()
      ])
    )
  })
})
