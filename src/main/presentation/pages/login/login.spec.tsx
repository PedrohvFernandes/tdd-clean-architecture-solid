import { Login } from './login'

import { Validation } from '@/protocols/validation'
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

class ValidationSpy implements Validation {
  // errorMessage!: string
  // input!: object
  errorMessage = ''
  input: object = {}

  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

// Factory
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
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
    const { sut } = makeSut()

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
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut()

    const emailInput = sut.getByTestId('email')
    // Alterando o input de algum campo. O value faz com que a gente popule o campo
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.input).toEqual({
      // O meu validation vai receber o campo que foi alterado(email) e o valor que foi alterado(any_email)
      email: 'any_email'
    })
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()

    const passwordInput = sut.getByTestId('password')
    // Alterando o input de algum campo. O value faz com que a gente popule o campo
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.input).toEqual({
      // O meu validation vai receber o campo que foi alterado(password) e o valor que foi alterado(any_password)
      password: 'any_password'
    })
  })
})
