import { Login } from './login'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases'
import { ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  RenderResult,
  render,
  fireEvent,
  cleanup
} from '@testing-library/react'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params!: AuthenticationParams
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

type SutLoginTypesReturn = {
  sutLogin: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutLoginParams = {
  validationError?: boolean
  // validationError: boolean
}

// Factory
const makeSutLogin = (
  { validationError }: SutLoginParams = {
    validationError: true
  }
  // params?:SutLoginParams
): SutLoginTypesReturn => {
  const validationSpy = new ValidationSpy()
  // Por padrão ele sempre vai ter erro
  validationSpy.errorMessage = validationError ? faker.word.adjective() : ''

  const authenticationSpy = new AuthenticationSpy()

  const sutLogin = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  )
  return {
    sutLogin,
    validationSpy,
    authenticationSpy
  }
}

describe('Login Component', () => {
  // Limpa o ambiente de teste entre os testes, isso garante que o teste não vai ser influenciado por um teste anterior, em relação ao estado do componente
  afterEach(cleanup)

  // Estado inicial
  test('Should start with initial state', () => {
    const { sutLogin, validationSpy } = makeSutLogin()

    // sutLogin.getAllByTestId
    const { getByTestId } = sutLogin
    // Em form status data-testid="error-wrap"
    const errorWrap = getByTestId('error-wrap')
    // No inicio o status não deve ter nada, nem o spinner nem a mensagem de erro
    expect(errorWrap.childElementCount).toBe(0)

    // Fazemos um cast(as) para HTMLInputElement para ter acesso a propriedade disabled
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    // Testando os inputs
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  // Testando se aquele campo é aquele campo em si e o valor que ele tem
  test('Should call validation with correct email', () => {
    const { sutLogin, validationSpy } = makeSutLogin()

    const emailInput = sutLogin.getByTestId('email')
    const email = faker.internet.email()
    // Alterando o input de algum campo. O value faz com que a gente popule o campo
    // fireEvent.input(emailInput, { target: { value: 'any_email' } })
    fireEvent.input(emailInput, { target: { value: email } })
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.filedName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call validation with correct password', () => {
    const { sutLogin, validationSpy } = makeSutLogin()

    const passwordInput = sutLogin.getByTestId('password')
    const password = faker.internet.password()

    // Alterando o input de algum campo. O value faz com que a gente popule o campo
    fireEvent.input(passwordInput, { target: { value: password } })
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.filedName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  // Testando a mensagem de erro
  test('Should show email error if call Validation fails', () => {
    const { sutLogin, validationSpy } = makeSutLogin()

    // const errorMessage = faker.word.adjective()
    // validationSpy.errorMessage = errorMessage

    const emailInput = sutLogin.getByTestId('email')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sutLogin.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if call Validation fails', () => {
    const { sutLogin, validationSpy } = makeSutLogin()

    // const errorMessage = faker.word.adjective()
    // validationSpy.errorMessage = errorMessage

    const passwordInput = sutLogin.getByTestId('password')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sutLogin.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  // Testando a mensagem de sucesso
  test('Should show valid password state if call Validation succeeds', () => {
    const { sutLogin } = makeSutLogin({
      validationError: false
    })

    // Ele não tem erro mensagem
    // validationSpy.errorMessage = ''

    const passwordInput = sutLogin.getByTestId('password')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sutLogin.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo Certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should show valid email state if call Validation succeeds', () => {
    const { sutLogin } = makeSutLogin({
      validationError: false
    })

    const emailInput = sutLogin.getByTestId('email')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    const emailStatus = sutLogin.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo Certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  // Testando button quando tudo esta preenchido sem nenhum erro
  test('Should enable submit button if from is valid', () => {
    const { sutLogin } = makeSutLogin({
      validationError: false
    })

    const getByTestId = sutLogin.getByTestId

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  // O ellipsis que é um spinner tem que aparecer na tela
  test('Should show loading ellipsis on submit', () => {
    const { sutLogin } = makeSutLogin({
      validationError: false
    })

    const getByTestId = sutLogin.getByTestId

    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    const ellipsis = getByTestId('ellipsis')

    expect(ellipsis).toBeTruthy()
  })

  // Validamos os valores que estão sendo passados para o Authentication
  test('Should call Authentication with correct values', () => {
    const { sutLogin, authenticationSpy } = makeSutLogin({
      validationError: false
    })

    const getByTestId = sutLogin.getByTestId

    const emailInput = getByTestId('email')
    const emailValue = faker.internet.email()

    const passwordInput = getByTestId('password')
    const passwordValue = faker.internet.password()

    fireEvent.input(emailInput, {
      target: { value: emailValue }
    })

    fireEvent.input(passwordInput, {
      target: { value: passwordValue }
    })

    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email: emailValue,
      password: passwordValue
    })
  })
})
