import { SignUp } from './signup'

import { Helper, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  Matcher,
  MatcherOptions,
  RenderResult,
  cleanup,
  render
} from '@testing-library/react'

type SutSignUpTypesReturn = {
  sutSignUp: RenderResult
  validationSpy: ValidationSpy
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement
}

type SutSignUpParams = {
  validationError?: boolean
  // validationError: boolean
}

const makeSutSignUp = (
  { validationError }: SutSignUpParams = {
    validationError: true
  }
): SutSignUpTypesReturn => {
  const validationSpy = new ValidationSpy()
  // Por padrão ele sempre vai ter erro
  validationSpy.errorMessage = validationError ? faker.word.adjective() : ''

  const sutSignUp = render(<SignUp validation={validationSpy} />)

  const { getByTestId } = sutSignUp

  return {
    sutSignUp,
    getByTestId,
    validationSpy
  }
}

describe('SignUp Component', () => {
  afterEach(() => cleanup())
  test('Should start with initial state', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    Helper.testElementChildCount(getByTestId, 'error-wrap', 0)

    Helper.testButtonIsDisabled(getByTestId, 'submit', true)

    Helper.testStatusForField(getByTestId, 'name', validationSpy.errorMessage)

    Helper.testStatusForField(getByTestId, 'email', validationSpy.errorMessage)

    Helper.testStatusForField(getByTestId, 'password', 'Campo obrigatório')

    Helper.testStatusForField(
      getByTestId,
      'passwordConfirmation',
      'Campo obrigatório'
    )
  })

  test('Should show name error if call Validation fails', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    Helper.populateField(getByTestId, 'name')
    Helper.testStatusForField(getByTestId, 'name', validationSpy.errorMessage)
  })

  test('Should show email error if call Validation fails', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    Helper.populateField(getByTestId, 'email')
    Helper.testStatusForField(getByTestId, 'email', validationSpy.errorMessage)
  })
})
