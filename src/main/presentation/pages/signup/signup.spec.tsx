import { Router } from 'react-router-dom'

import { ApiContext } from '../../contexts/api/api-context'
import { SignUp } from './signup'

import { ConfigRoute } from '@/config/index'
import { InvalidCredentialsError } from '@/domain/errors'
import { AddAccountSpy, mockAccountModel } from '@/domain/test'
import { AddAccount } from '@/domain/usecases'
import { Helper, ValidationSpy } from '@/presentation/test'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { faker } from '@faker-js/faker'
import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

type SutSignUpTypesReturn = {
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
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

  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider
      value={{
        getCurrentAccount: () => mockAccountModel(), // Por padrão ele sempre vai ter um account, mas não iremos precisar dele aqui
        setCurrentAccount: setCurrentAccountMock
      }}
    >
      <Router location={history.location} navigator={history}>
        <SignUp validation={validationSpy} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    validationSpy,
    addAccountSpy,
    setCurrentAccountMock
  }
}

export const simulateValidSubmit = async (
  emailValue = faker.internet.email(),
  passwordValue = faker.internet.password(),
  nameValue = faker.internet.userName()
): Promise<void> => {
  Helper.populateField('name', nameValue)

  Helper.populateField('email', emailValue)

  Helper.populateField('password', passwordValue)
  Helper.populateField('passwordConfirmation', passwordValue)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { validationSpy } = makeSutSignUp()

    Helper.testElementChildCount('error-wrap', 0)

    Helper.testButtonIsDisabled('submit', true)

    Helper.testStatusForField('name', validationSpy.errorMessage)

    Helper.testStatusForField('email', validationSpy.errorMessage)

    Helper.testStatusForField('password', validationSpy.errorMessage)

    Helper.testStatusForField(
      'passwordConfirmation',
      validationSpy.errorMessage
    )
  })

  test('Should show name error if call Validation fails', () => {
    const { validationSpy } = makeSutSignUp()

    Helper.populateField('name')
    Helper.testStatusForField('name', validationSpy.errorMessage)
  })

  test('Should show email error if call Validation fails', () => {
    const { validationSpy } = makeSutSignUp()

    Helper.populateField('email')
    Helper.testStatusForField('email', validationSpy.errorMessage)
  })

  test('Should show password error if call Validation fails', () => {
    const { validationSpy } = makeSutSignUp()

    Helper.populateField('password')
    Helper.testStatusForField('password', validationSpy.errorMessage)
  })

  test('Should show passwordConfirmation error if call Validation fails', () => {
    const { validationSpy } = makeSutSignUp()

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField(
      'passwordConfirmation',
      validationSpy.errorMessage
    )
  })

  test('Should show valid name state if call Validation succeeds', () => {
    makeSutSignUp({
      validationError: false
    })

    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('Should show valid email state if call Validation succeeds', () => {
    makeSutSignUp({
      validationError: false
    })

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid passwordConfirmation state if call Validation succeeds', () => {
    makeSutSignUp({
      validationError: false
    })

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if from is valid', () => {
    makeSutSignUp({
      validationError: false
    })

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')

    Helper.testButtonIsDisabled('submit', false)
  })

  // O ellipsis que é um spinner tem que aparecer na tela
  test('Should show loading ellipsis on submit', async () => {
    makeSutSignUp({
      validationError: false
    })

    await simulateValidSubmit()

    // Verificamos se o spinner esta em tela
    Helper.testElementExist('ellipsis')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSutSignUp({
      validationError: false
    })

    const nameValue = faker.internet.userName()
    const emailValue = faker.internet.email()
    const passwordValue = faker.internet.password()

    await simulateValidSubmit(emailValue, passwordValue, nameValue)

    expect(addAccountSpy.params).toEqual({
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      passwordConfirmation: passwordValue
    })
  })

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSutSignUp({
      validationError: false
    })

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', async () => {
    const { addAccountSpy } = makeSutSignUp()

    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should preset error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSutSignUp({
      validationError: false
    })
    const error = new InvalidCredentialsError()

    // Se o metodo add do usecase addaccount falhar, ele vai retornar um erro. Aqui mocamos um erro para o retorno dele
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidSubmit()

    Helper.testElementText('main-error', error.message)

    Helper.testElementChildCount('error-wrap', 1)
  })

  test('Should call CurrentCalledWith  on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSutSignUp({
      validationError: false
    })

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)

    expect(history.location.pathname).toBe(ConfigRoute.fourDev.surveyList.path)
    expect(countQuantityRoute({}).quantityRoutes).toBe(1)
  })

  test('Should go to login page', async () => {
    makeSutSignUp({
      validationError: false
    })
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)

    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)

    expect(
      countQuantityRoute({
        replace: true
      }).quantityRoutes
    ).toBe(1)
  })
})
