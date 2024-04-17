import { Login } from './login'

import { ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  RenderResult,
  render,
  fireEvent,
  cleanup
} from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
  // eslint-disable-next-line no-use-before-define
  validationSpy: ValidationSpy
}

// Factory
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  // Por padrão ele sempre vai ter erro, e nos casos de sucesso retiramos o erro
  validationSpy.errorMessage = faker.word.adjective()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  // Limpa o ambiente de teste entre os testes, isso garante que o teste não vai ser influenciado por um teste anterior, em relação ao estado do componente
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { sut, validationSpy } = makeSut()

    // sut.getAllByTestId
    const { getByTestId } = sut
    // Em form status data-testid="error-wrap"
    const errorWrap = getByTestId('error-wrap')
    // No inicio o status não deve ter nada, nem o spinner nem a mensagem de erro
    expect(errorWrap.childElementCount).toBe(0)

    // Fazemos um cast para HTMLInputElement para ter acesso a propriedade disabled
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    // Testando os inputs
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

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

  test('Should show email error if call validation fails', () => {
    const { sut, validationSpy } = makeSut()

    const errorMessage = faker.word.adjective()
    validationSpy.errorMessage = errorMessage

    const emailInput = sut.getByTestId('email')

    // Alterando o input de algum campo. O value faz com que a gente popule o campo
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
