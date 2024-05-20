import { SignUp } from './signup'

import { Helper, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  Matcher,
  MatcherOptions,
  RenderResult,
  cleanup,
  fireEvent,
  render,
  waitFor
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

export const simulateValidSubmit = async (
  sutLogin: RenderResult,
  emailValue = faker.internet.email(),
  passwordValue = faker.internet.password(),
  nameValue = faker.internet.userName()
): Promise<void> => {
  const getByTestId = sutLogin.getByTestId

  Helper.populateField(getByTestId, 'name', nameValue)

  Helper.populateField(getByTestId, 'email', emailValue)

  Helper.populateField(getByTestId, 'password', passwordValue)
  Helper.populateField(getByTestId, 'passwordConfirmation', passwordValue)

  const form = getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('SignUp Component', () => {
  afterEach(() => cleanup())
  test('Should start with initial state', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    Helper.testElementChildCount(getByTestId, 'error-wrap', 0)

    Helper.testButtonIsDisabled(getByTestId, 'submit', true)

    Helper.testStatusForField(getByTestId, 'name', validationSpy.errorMessage)

    Helper.testStatusForField(getByTestId, 'email', validationSpy.errorMessage)

    Helper.testStatusForField(
      getByTestId,
      'password',
      validationSpy.errorMessage
    )

    Helper.testStatusForField(
      getByTestId,
      'passwordConfirmation',
      validationSpy.errorMessage
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

  test('Should show password error if call Validation fails', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    Helper.populateField(getByTestId, 'password')
    Helper.testStatusForField(
      getByTestId,
      'password',
      validationSpy.errorMessage
    )
  })

  test('Should show passwordConfirmation error if call Validation fails', () => {
    const { getByTestId, validationSpy } = makeSutSignUp()

    Helper.populateField(getByTestId, 'passwordConfirmation')
    Helper.testStatusForField(
      getByTestId,
      'passwordConfirmation',
      validationSpy.errorMessage
    )
  })
  test('Should show valid name state if call Validation succeeds', () => {
    const { getByTestId } = makeSutSignUp({
      validationError: false
    })

    Helper.populateField(getByTestId, 'name')
    Helper.testStatusForField(getByTestId, 'name')
  })

  test('Should show valid email state if call Validation succeeds', () => {
    const { getByTestId } = makeSutSignUp({
      validationError: false
    })

    Helper.populateField(getByTestId, 'email')
    Helper.testStatusForField(getByTestId, 'email')
  })

  test('Should show valid passwordConfirmation state if call Validation succeeds', () => {
    const { getByTestId } = makeSutSignUp({
      validationError: false
    })

    Helper.populateField(getByTestId, 'passwordConfirmation')
    Helper.testStatusForField(getByTestId, 'passwordConfirmation')
  })

  test('Should enable submit button if from is valid', () => {
    const { getByTestId } = makeSutSignUp({
      validationError: false
    })

    Helper.populateField(getByTestId, 'name')
    Helper.populateField(getByTestId, 'email')
    Helper.populateField(getByTestId, 'password')
    Helper.populateField(getByTestId, 'passwordConfirmation')

    Helper.testButtonIsDisabled(getByTestId, 'submit', false)
  })

  // O ellipsis que é um spinner tem que aparecer na tela
  test('Should show loading ellipsis on submit', async () => {
    const { sutSignUp } = makeSutSignUp({
      validationError: false
    })

    await simulateValidSubmit(sutSignUp)

    // Verificamos se o spinner esta em tela
    Helper.testElementExist(sutSignUp.getByTestId, 'ellipsis')
  })
})
