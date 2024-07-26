import { Router } from 'react-router-dom'

import { SignUp } from './signup'

import { ConfigRoute } from '@/config/index'
import {
  InvalidCredentialsError,
  InvalidSaveAccessToken
} from '@/domain/errors'
import {
  Helper,
  ValidationSpy,
  AddAccountSpy,
  UpdateCurrentAccountMock
} from '@/presentation/test'
import { countQuantityRoute } from '@/utils/create-memory-history'
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
import { createMemoryHistory } from 'history'

type SutSignUpTypesReturn = {
  sutSignUp: RenderResult
  validationSpy: ValidationSpy
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement
  addAccountSpy: AddAccountSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

type SutSignUpParams = {
  validationError?: boolean
  // validationError: boolean
}

const history = createMemoryHistory({
  initialEntries: [ConfigRoute.fourDev.signup.path]
})

history.listen((location) => {
  countQuantityRoute({
    location
  })
})

const makeSutSignUp = (
  { validationError }: SutSignUpParams = {
    validationError: true
  }
): SutSignUpTypesReturn => {
  const validationSpy = new ValidationSpy()
  // Por padrão ele sempre vai ter erro
  validationSpy.errorMessage = validationError ? faker.word.adjective() : ''

  const addAccountSpy = new AddAccountSpy()

  const updateCurrentAccountMock = new UpdateCurrentAccountMock()

  const sutSignUp = render(
    <Router location={history.location} navigator={history}>
      <SignUp
        validation={validationSpy}
        addAccount={addAccountSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  )

  const { getByTestId } = sutSignUp

  return {
    sutSignUp,
    getByTestId,
    validationSpy,
    addAccountSpy,
    updateCurrentAccountMock
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

  test('Should call AddAccount with correct values', async () => {
    const { sutSignUp, addAccountSpy } = makeSutSignUp({
      validationError: false
    })

    const nameValue = faker.internet.userName()
    const emailValue = faker.internet.email()
    const passwordValue = faker.internet.password()

    await simulateValidSubmit(sutSignUp, emailValue, passwordValue, nameValue)

    expect(addAccountSpy.params).toEqual({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      passwordConfirmation: passwordValue
    })
  })

  test('Should call AddAccount only once', async () => {
    const { sutSignUp, addAccountSpy } = makeSutSignUp({
      validationError: false
    })

    await simulateValidSubmit(sutSignUp)
    await simulateValidSubmit(sutSignUp)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const { sutSignUp, addAccountSpy } = makeSutSignUp()

    await simulateValidSubmit(sutSignUp)

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should preset error if AddAccount fails', async () => {
    const { sutSignUp, getByTestId, addAccountSpy } = makeSutSignUp({
      validationError: false
    })
    const error = new InvalidCredentialsError()

    // Se o metodo add do usecase addaccount falhar, ele vai retornar um erro. Aqui mocamos um erro para o retorno dele
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidSubmit(sutSignUp)

    Helper.testElementText(getByTestId, 'main-error', error.message)

    Helper.testElementChildCount(getByTestId, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sutSignUp, addAccountSpy, updateCurrentAccountMock } =
      makeSutSignUp({
        validationError: false
      })

    await simulateValidSubmit(sutSignUp)

    expect(updateCurrentAccountMock.account).toEqual(addAccountSpy.account)

    expect(history.location.pathname).toBe(
      ConfigRoute.fourDev.default.source.path
    )
    expect(countQuantityRoute({}).quantityRoutes).toBe(1)
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const { sutSignUp, getByTestId, updateCurrentAccountMock } = makeSutSignUp({
      validationError: false
    })

    const error = new InvalidSaveAccessToken()

    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error)

    await simulateValidSubmit(sutSignUp)

    await waitFor(() => getByTestId('main-error'))

    Helper.testElementText(getByTestId, 'main-error', error.message)
    Helper.testElementChildCount(getByTestId, 'error-wrap', 1)
  })

  test('Should go to login page', async () => {
    const { getByTestId } = makeSutSignUp({
      validationError: false
    })
    const loginLink = getByTestId('login-link')
    fireEvent.click(loginLink)

    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)

    expect(
      countQuantityRoute({
        replace: true
      }).quantityRoutes
    ).toBe(1)
  })
})
