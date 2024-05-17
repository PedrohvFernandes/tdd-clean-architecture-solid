import { SignUp } from './signup'

import { Helper, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  Matcher,
  MatcherOptions,
  RenderResult,
  cleanup,
  fireEvent,
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

const populateField = (
  // sutLogin: RenderResult,
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string,
  fieldValue = faker.word.adjective()
): void => {
  // const emailInput = sutLogin.getByTestId('email')
  const input = getByTestId(fieldName)
  fireEvent.input(input, { target: { value: fieldValue } })
}

describe('SignUp Component', () => {
  afterEach(() => cleanup())
  test('Should start with initial state', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    Helper.testElementChildCount(getByTestId, 'error-wrap', 0)

    Helper.testButtonIsDisabled(getByTestId, 'submit', true)

    Helper.testStatusForField(getByTestId, 'name', validationSpy.errorMessage)

    Helper.testStatusForField(getByTestId, 'email', 'Campo obrigatório')

    Helper.testStatusForField(getByTestId, 'password', 'Campo obrigatório')

    Helper.testStatusForField(
      getByTestId,
      'passwordConfirmation',
      'Campo obrigatório'
    )
  })

  test('Should show name error if call Validation fails', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    populateField(getByTestId, 'name')
    Helper.testStatusForField(getByTestId, 'name', validationSpy.errorMessage)
  })
})
