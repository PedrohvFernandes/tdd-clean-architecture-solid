import { Login } from './login'

import { ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  RenderResult,
  render,
  fireEvent,
  cleanup
} from '@testing-library/react'

type SutTypesReturn = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

type SutParams = {
  validationError?: boolean
  // validationError: boolean
}

// Factory
const makeSut = (
  { validationError }: SutParams = {
    validationError: true
  }
  // params?:SutParams
): SutTypesReturn => {
  const validationSpy = new ValidationSpy()
  // Por padrão ele sempre vai ter erro
  validationSpy.errorMessage = validationError ? faker.word.adjective() : ''
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  // Limpa o ambiente de teste entre os testes, isso garante que o teste não vai ser influenciado por um teste anterior, em relação ao estado do componente
  afterEach(cleanup)

  // Estado inicial
  test('Should start with initial state', () => {
    const { sut, validationSpy } = makeSut()

    // sut.getAllByTestId
    const { getByTestId } = sut
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
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    // Alterando o input de algum campo. O value faz com que a gente popule o campo
    // fireEvent.input(emailInput, { target: { value: 'any_email' } })
    fireEvent.input(emailInput, { target: { value: email } })
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.filedName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()

    // Alterando o input de algum campo. O value faz com que a gente popule o campo
    fireEvent.input(passwordInput, { target: { value: password } })
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.filedName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  // Testando a mensagem de erro
  test('Should show email error if call Validation fails', () => {
    const { sut, validationSpy } = makeSut()

    // const errorMessage = faker.word.adjective()
    // validationSpy.errorMessage = errorMessage

    const emailInput = sut.getByTestId('email')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show password error if call Validation fails', () => {
    const { sut, validationSpy } = makeSut()

    // const errorMessage = faker.word.adjective()
    // validationSpy.errorMessage = errorMessage

    const passwordInput = sut.getByTestId('password')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  // Testando a mensagem de sucesso
  test('Should show valid password state if call Validation succeeds', () => {
    const { sut } = makeSut({
      validationError: false
    })

    // Ele não tem erro mensagem
    // validationSpy.errorMessage = ''

    const passwordInput = sut.getByTestId('password')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo Certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should show valid email state if call Validation succeeds', () => {
    const { sut } = makeSut({
      validationError: false
    })

    const emailInput = sut.getByTestId('email')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() }
    })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo Certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  // Testando button quando tudo esta preenchido sem nenhum erro
  test('Should enable submit button if from is valid', () => {
    const { sut } = makeSut({
      validationError: false
    })

    const getByTestId = sut.getByTestId

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
    const { sut } = makeSut({
      validationError: false
    })

    const getByTestId = sut.getByTestId

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
})
