// Testando o login e seus campos
import { Router } from 'react-router-dom'

import { ApiContext } from '../../contexts/api/api-context'
import { Login } from './login'

import { ConfigRoute } from '@/config/index'
import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import {
  Helper,
  // UpdateCurrentAccountMock,
  AuthenticationSpy,
  ValidationSpy
} from '@/presentation/test'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { faker } from '@faker-js/faker'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// Caso esteja sofrendo Cannot find module 'history': Para usar tem que dar um npm i history e npm i @types/history. Quando instalar o projeto ja vai fir as libs porque tive esse problema
import { createMemoryHistory } from 'history'

type SutLoginTypesReturn = {
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutLoginParams = {
  validationError?: boolean
}

const history = createMemoryHistory({
  initialEntries: [ConfigRoute.fourDev.login.path] // Ponto de partida /login
})

// Adicionar um listener para atualizar a lista de rotas visitadas sempre que a localização do histórico mudar
history.listen((location) => {
  countQuantityRoute({
    location
  })
})

// Factory
const makeSutLogin = (
  { validationError }: SutLoginParams = {
    validationError: true
  }
): SutLoginTypesReturn => {
  const validationSpy = new ValidationSpy()
  // Por padrão ele sempre vai ter erro
  validationSpy.errorMessage = validationError ? faker.word.adjective() : ''

  const authenticationSpy = new AuthenticationSpy()

  const setCurrentAccountMock = jest.fn()

  // usando o history da lib history https://stackoverflow.com/questions/73364590/react-router-and-creatememoryhistory-in-test-property-location-does-not-exist
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel() // Por padrão ele sempre vai ter um account, mas não iremos precisar dele aqui
      }}
    >
      <Router location={history.location} navigator={history}>
        <Login validation={validationSpy} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    validationSpy,
    authenticationSpy,
    setCurrentAccountMock
  }
}

// Helper especifico para o login
const simulateValidSubmit = async (
  emailValue = faker.internet.email(),
  passwordValue = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', emailValue)

  Helper.populateField('password', passwordValue)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Login Component', () => {
  // Limpa o ambiente de teste entre os testes, isso garante que o teste não vai ser influenciado por um teste anterior, em relação ao estado do componente. Retiramos pois isso ja acontece de forma automatica
  // afterEach(() => cleanup())

  // Estado inicial
  test('Should start with initial state', () => {
    const {
      // Por padrão na criação do validationSpy tem um erro, logo o form não esta valido, ou seja, os campos estão vazios
      validationSpy
    } = makeSutLogin()

    // No inicio o status não deve ter nada, nem o spinner nem a mensagem de erro
    Helper.testElementChildCount('error-wrap', 0)

    Helper.testButtonIsDisabled('submit', true)

    // Testando os status dos inputs

    Helper.testStatusForField('email', validationSpy.errorMessage)
    Helper.testStatusForField('password', validationSpy.errorMessage)
  })
  // Testando a mensagem de erro
  test('Should show email error if call Validation fails', () => {
    const { validationSpy } = makeSutLogin()

    // Como não vou comprar o valor, mas sim somente o erro, então não preciso passar o valor, posso deixar o valor que ja é criado no helper por padrão
    Helper.populateField('email')
    Helper.testStatusForField('email', validationSpy.errorMessage)
  })

  test('Should show password error if call Validation fails', () => {
    const { validationSpy } = makeSutLogin()

    Helper.populateField('password')
    Helper.testStatusForField('password', validationSpy.errorMessage)
  })

  // Testando a mensagem de sucesso
  test('Should show valid password state if call Validation succeeds', () => {
    makeSutLogin({
      validationError: false
    })

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('Should show valid email state if call Validation succeeds', () => {
    makeSutLogin({
      validationError: false
    })

    Helper.populateField('email')

    Helper.testStatusForField('email')
  })

  // Testando button quando tudo esta preenchido sem nenhum erro
  test('Should enable submit button if from is valid', () => {
    makeSutLogin({
      validationError: false
    })

    Helper.populateField('email')
    Helper.populateField('password')

    Helper.testButtonIsDisabled('submit', false)
  })

  // O ellipsis que é um spinner tem que aparecer na tela
  test('Should show loading ellipsis on submit', async () => {
    makeSutLogin({
      validationError: false
    })

    await simulateValidSubmit()

    // Verificamos se o spinner esta em tela
    Helper.testElementExist('ellipsis')
  })

  // Validamos os valores que estão sendo passados para o Authentication
  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSutLogin({
      validationError: false
    })

    const emailValue = faker.internet.email()
    const passwordValue = faker.internet.password()
    // No simultate valid submit passa os valores para os campos, clica no botão e dispara a função de submit do form que é chamar o authentication com o metodo auth, nesse caso vem da class AuthenticationSpy que é passada para o componente login que é passado para o formLogin
    await simulateValidSubmit(emailValue, passwordValue)

    expect(authenticationSpy.params).toEqual({
      email: emailValue,
      password: passwordValue
    })
  })

  // Validamos se chamamos somente uma vez o Authentication
  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSutLogin({
      validationError: false
    })

    // Estamos simulando dois cliques no botão de submit
    await simulateValidSubmit()
    await simulateValidSubmit()

    // Esperamos que ele chame somente uma vez, porque a autenticação é uma chamada assincrona, ou seja, ja vai estar no processo de autenticação
    expect(authenticationSpy.callsCount).toBe(1)
  })

  // Testando se o botão de submit esta desabilitado
  test('Should not call Authentication if form is invalid', async () => {
    // Agora possui um erro message, logo o form é invalido, porque somente o email esta preenchido
    const { authenticationSpy } = makeSutLogin()

    await simulateValidSubmit()

    // Esperamos que ele não chame a autenticação, porque o form esta invalido, nenhum campo está  preenchido
    expect(authenticationSpy.callsCount).toBe(0)
  })

  // Nesse teste, testamos se o erro é exibido na tela caso de errado a autenticação
  test('Should preset error if Authentication fails', async () => {
    const { authenticationSpy } = makeSutLogin({
      validationError: false
    })
    const error = new InvalidCredentialsError()
    // Mocamos o retorno do authentication para ser um erro, porque o padrão dele é retornar um Promise.resolve(this.account) quando passamos os valores corretos, mas nesse caso queremos testar o erro caso de errado no envio das credenciais. Lembrando que isso para ocorrer não pode ter o erro dos campos(errorMessage) no validationSpy, porque eles estão preenchidos corretamente, o erro é na autenticação, logo validationError: false
    jest
      // Espionamos o auth e retornamos um reject com o erro, em vez do accountModel
      .spyOn(authenticationSpy, 'auth')
      .mockRejectedValueOnce(error)

    await simulateValidSubmit()

    // Eu espero que o erro seja exibido na tela e tem que ter a mensagem do erro
    Helper.testElementText('main-error', error.message)

    // Eu espero que o erro seja exibido, somente ele, e que o spinner não esteja em tela. Ou seja, somente um filho no error-wrap
    Helper.testElementChildCount('error-wrap', 1)
  })
  test('Should call CurrentCalledWith on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSutLogin({
      validationError: false
    })

    await simulateValidSubmit()

    // A gente espera que o setCurrentAccountMock seja chamado com o account que vem do authenticationSpy.account
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )

    // Verifica se estamos no /, porque o navigate(form-login) vai para / apos dar tudo certo no auth
    expect(history.location.pathname).toBe(
      ConfigRoute.fourDev.default.source.path
    )
    expect(countQuantityRoute({}).quantityRoutes).toBe(1)
  })

  test('Should go to signup page', async () => {
    makeSutLogin({
      validationError: false
    })

    const signupLink = screen.getByTestId('signup-link')
    fireEvent.click(signupLink)

    // Verifica se estamos agora na rota /signup
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.signup.path)
    // Verifica se o historico de navegação tem 2 itens, porque ele vai ter o /login e o /signup
    console.log({
      windowHistoryLength: window.history.length,
      quantityRoutes: countQuantityRoute({}).quantityRoutes
    })
    expect(countQuantityRoute({}).quantityRoutes).toBe(2)
  })
})
