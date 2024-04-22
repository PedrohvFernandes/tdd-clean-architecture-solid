import {
  BrowserRouter
  // RouterProvider,
  // createMemoryRouter
} from 'react-router-dom'

import { Login } from './login'

import { ConfigRoute } from '@/config/index'
import { InvalidCredentialsError } from '@/domain/errors'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  RenderResult,
  render,
  fireEvent,
  cleanup,
  Matcher,
  MatcherOptions,
  waitFor
} from '@testing-library/react'

// Para usar tem que dar um npm i history e npm i @types/history
// import { createMemoryHistory } from 'history'

import 'jest-localstorage-mock'

type SutLoginTypesReturn = {
  sutLogin: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement
}

type SutLoginParams = {
  validationError?: boolean
  // validationError: boolean
}

// const history = createMemoryHistory()

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

  // Antes quando não íamos para outra tela, era so renderizar o componente
  // const sutLogin = render(
  //   <Login validation={validationSpy} authentication={authenticationSpy} />
  // )

  // Depois que passamos a testar a navegação. Mas essa forma ficou depravada na v6 do react-router-dom, porque não é possivel mais passar o history pro Router ou BrowserRouter
  // const sutLogin = render(
  //   <BrowserRouter
  //     // history={history}
  //   >
  //     <Login validation={validationSpy} authentication={authenticationSpy} />
  //   </BrowserRouter>
  // )

  // Dessa forma funcionou parcialmente. Lembrando que dessa forma tive que usar o useNavigate para navegar para outra tela no botão de signup, em vez do link
  // A diferença do createMemoryRouter  pro createBrowserRouter, é que esse é para criar rotas em memoria, qual que é o seguimento que ele vai seguir, qual que é a rota inicial, qual que é o index inicial
  // https://reactrouter.com/en/main/router-components/memory-router
  // https://v5.reactrouter.com/web/api/MemoryRouter
  // https://reactrouter.com/en/main/routers/create-memory-router
  // https://stackoverflow.com/questions/75802982/what-is-the-difference-between-browserrouter-and-createbrowserrouter-in-react-ro
  // const routes = [
  //   {
  //     path: ConfigRoute.fourDev.login.path,
  //     element: (
  //       <Login validation={validationSpy} authentication={authenticationSpy} />
  //     )
  //   },
  //   { path: ConfigRoute.fourDev.signup.path, element: <div>Signup</div> }
  // ]

  // const router = createMemoryRouter(routes, {
  //   initialEntries: [
  //     ConfigRoute.fourDev.login.path,
  //     ConfigRoute.fourDev.signup.path
  //   ],
  //   initialIndex: 0 // Iria inicia no login, que é a posição 0
  // })

  // const sutLogin = render(<RouterProvider router={router} />)

  // Então resolvi fazer assim. Sem passar o history para ele. Com isso eu puxo o history do window
  const sutLogin = render(
    <BrowserRouter>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </BrowserRouter>
  )

  const { getByTestId } = sutLogin

  return {
    sutLogin,
    validationSpy,
    authenticationSpy,
    getByTestId
  }
}

// Helpers
// Helpers 1: O emailValue e passwordValue ja fica injetado no helper, com valores ja padrões para testes que não precisa necessariamente se os valores estão iguais(corretos - comparação), ex: o spinner que os campos so precisam estar preenchidos para fazer o spinner aparecer
// const simulateValidSubmit = (
//   sutLogin: RenderResult,
//   emailValue = faker.internet.email(),
//   passwordValue = faker.internet.password()
// ): void => {
//   const getByTestId = sutLogin.getByTestId

//   const emailInput = getByTestId('email')
//   // const emailValue = faker.internet.email()

//   const passwordInput = getByTestId('password')
//   // const passwordValue = faker.internet.password()

//   fireEvent.input(emailInput, {
//     target: { value: emailValue }
//   })

//   fireEvent.input(passwordInput, {
//     target: { value: passwordValue }
//   })

//   const submitButton = getByTestId('submit')
//   fireEvent.click(submitButton)
// }

const simulateValidSubmit = (
  sutLogin: RenderResult,
  emailValue = faker.internet.email(),
  passwordValue = faker.internet.password()
): void => {
  const getByTestId = sutLogin.getByTestId

  populateEmailField(getByTestId, emailValue)
  populatePasswordField(getByTestId, passwordValue)

  const submitButton = getByTestId('submit')
  fireEvent.click(submitButton)
}

// Helper 2: Popula os campos com valores
// const populateField = (
//   sutLogin: RenderResult,
//   fieldName: string,
//   inputValue: string
// ): void => {
//   const input = sutLogin.getByTestId(fieldName)
//   fireEvent.input(input, { target: { inputValue } })
//   console.log(input)
// }
// Helper 2: Popula o campo de email
const populateEmailField = (
  // sutLogin: RenderResult,
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  emailValue = faker.internet.email()
): void => {
  // const emailInput = sutLogin.getByTestId('email')
  const emailInput = getByTestId('email')
  fireEvent.input(emailInput, { target: { value: emailValue } })
}
// Helper 3: Popula o campo de password
const populatePasswordField = (
  // sutLogin: RenderResult,
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  passwordValue = faker.internet.password()
): void => {
  // const passwordInput = sutLogin.getByTestId('password')
  const passwordInput = getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: passwordValue } })
}

// Helper 4: Simula o status do campo, se ele é valido ou invalido
const simulateStatusForField = (
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement,
  fieldName: string,
  // Se não passar nada, ele vai ser um campo valido, se passar ele vai ser um campo invalido, ou seja, estamos testando o campo valido e invalido, o status dele
  validationErrorMessage?: string
): void => {
  // const emailStatus = getByTestId('email-status')
  const fieldNameStatus = getByTestId(`${fieldName}-status`)
  // expect(fieldNameStatus.title).toBe(validationSpy.errorMessage)
  // Se não passar a validationErrorMessage ele mostra o tudo certo, se passar ele mostra a mensagem de erro
  expect(fieldNameStatus.title).toBe(validationErrorMessage ?? 'Tudo Certo!')
  expect(fieldNameStatus.textContent).toBe(validationErrorMessage ? '🔴' : '🟢')
}

describe('Login Component', () => {
  // Limpa o ambiente de teste entre os testes, isso garante que o teste não vai ser influenciado por um teste anterior, em relação ao estado do componente
  afterEach(cleanup)
  // Entre os testes eu limpo sempre o localstorage, so pra evitar o problema de um teste influenciar no outro
  beforeEach(() => {
    localStorage.clear()
  })

  // Estado inicial
  test('Should start with initial state', () => {
    const {
      // sutLogin,
      // Por padrão na criação do validationSpy tem um erro, logo o form não esta valido, ou seja, os campos estão vazios
      validationSpy,
      getByTestId
    } = makeSutLogin()

    // sutLogin.getAllByTestId
    // const { getByTestId } = sutLogin

    // Em form status data-testid="error-wrap"
    const errorWrap = getByTestId('error-wrap')
    // No inicio o status não deve ter nada, nem o spinner nem a mensagem de erro
    expect(errorWrap.childElementCount).toBe(0)

    // Fazemos um cast(as) para HTMLInputElement para ter acesso a propriedade disabled
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    // Testando os status dos inputs

    // const emailStatus = getByTestId('email-status')
    // expect(emailStatus.title).toBe(validationSpy.errorMessage)
    // expect(emailStatus.textContent).toBe('🔴')
    simulateStatusForField(getByTestId, 'email', validationSpy.errorMessage)
    simulateStatusForField(getByTestId, 'password', validationSpy.errorMessage)
  })

  // Testando se aquele campo é aquele campo em si e o valor que ele tem
  test('Should call validation with correct email', () => {
    // Aqui é independentemente se tem erro ou não nos campos, so quero validar se de fato é o campo email e se de fato ele tem o valor passado para ele
    const {
      // sutLogin,
      validationSpy,
      getByTestId
    } = makeSutLogin()

    // const emailInput = sutLogin.getByTestId('email')
    // const email = faker.internet.email()
    // // Alterando o input de algum campo. O value faz com que a gente popule o campo
    // // fireEvent.input(emailInput, { target: { value: 'any_email' } })
    // fireEvent.input(emailInput, { target: { value: email } })

    // Aqui como eu tenho que comprar o valor tenho que criar ela por aqui e passar para o helper para ele popularizar o campo e depois fazer a comparação desse mesmo valor
    const emailValue = faker.internet.email()
    populateEmailField(getByTestId, emailValue)
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.filedName).toBe('email')
    expect(validationSpy.fieldValue).toBe(emailValue)
  })

  test('Should call validation with correct password', () => {
    const { validationSpy, getByTestId } = makeSutLogin()

    // const passwordInput = sutLogin.getByTestId('password')
    // const password = faker.internet.password()

    // // Alterando o input de algum campo. O value faz com que a gente popule o campo
    // fireEvent.input(passwordInput, { target: { value: password } })

    const passwordValue = faker.internet.password()
    populatePasswordField(getByTestId, passwordValue)
    // Eu espero que so de alterar ele, eu ja quero disparar a validação, porque eu quero validar em tempo real
    expect(validationSpy.filedName).toBe('password')
    expect(validationSpy.fieldValue).toBe(passwordValue)
  })

  // Testando a mensagem de erro
  test('Should show email error if call Validation fails', () => {
    const {
      // sutLogin,
      validationSpy,
      getByTestId
    } = makeSutLogin()

    // const errorMessage = faker.word.adjective()
    // validationSpy.errorMessage = errorMessage

    // const emailInput = sutLogin.getByTestId('email')

    // // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    // fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    // Como não vou comprar o valor, mas sim somente o erro, então não preciso passar o valor, posso deixar o valor que ja é criado no helper por padrão
    populateEmailField(getByTestId)
    simulateStatusForField(getByTestId, 'email', validationSpy.errorMessage)
  })

  test('Should show password error if call Validation fails', () => {
    const {
      // sutLogin,
      validationSpy,
      getByTestId
    } = makeSutLogin()

    // const errorMessage = faker.word.adjective()
    // validationSpy.errorMessage = errorMessage

    // const passwordInput = sutLogin.getByTestId('password')

    // // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    // fireEvent.input(passwordInput, {
    //   target: { value: faker.internet.password() }
    // })

    populatePasswordField(getByTestId)
    simulateStatusForField(getByTestId, 'password', validationSpy.errorMessage)
  })

  // Testando a mensagem de sucesso
  test('Should show valid password state if call Validation succeeds', () => {
    // const { sutLogin } = makeSutLogin({
    //   validationError: false
    // })

    const { getByTestId } = makeSutLogin({
      validationError: false
    })

    // Ele não tem erro mensagem
    // validationSpy.errorMessage = ''

    // const passwordInput = sutLogin.getByTestId('password')

    // // Alterando o input de algum campo. O value faz com que a gente popule o campo. Como não iremos testar o valor do input em si, mas o erro, não importa o valor que colocamos, logo não precisamos fixar esse valor em uma variável
    // fireEvent.input(passwordInput, {
    //   target: { value: faker.internet.password() }
    // })
    // const passwordStatus = sutLogin.getByTestId('password-status')

    populatePasswordField(getByTestId)
    simulateStatusForField(getByTestId, 'password')
  })

  test('Should show valid email state if call Validation succeeds', () => {
    const { getByTestId } = makeSutLogin({
      validationError: false
    })

    populateEmailField(getByTestId)
    // const emailStatus = getByTestId('email-status')

    // expect(emailStatus.title).toBe('Tudo Certo!')
    // expect(emailStatus.textContent).toBe('🟢')
    simulateStatusForField(getByTestId, 'email')
  })

  // Testando button quando tudo esta preenchido sem nenhum erro
  test('Should enable submit button if from is valid', () => {
    // const { sutLogin } = makeSutLogin({
    //   validationError: false
    // })
    const { getByTestId } = makeSutLogin({
      validationError: false
    })

    // const getByTestId = sutLogin.getByTestId

    // const emailInput = getByTestId('email')
    // const passwordInput = getByTestId('password')

    // fireEvent.input(emailInput, {
    //   target: { value: faker.internet.email() }
    // })

    // fireEvent.input(passwordInput, {
    //   target: { value: faker.internet.password() }
    // })

    populateEmailField(getByTestId)
    populatePasswordField(getByTestId)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  // O ellipsis que é um spinner tem que aparecer na tela
  test('Should show loading ellipsis on submit', () => {
    const { sutLogin } = makeSutLogin({
      validationError: false
    })

    simulateValidSubmit(sutLogin)

    const ellipsis = sutLogin.getByTestId('ellipsis')

    expect(ellipsis).toBeTruthy()
  })

  // Validamos os valores que estão sendo passados para o Authentication
  test('Should call Authentication with correct values', () => {
    const { sutLogin, authenticationSpy } = makeSutLogin({
      validationError: false
    })

    // const getByTestId = sutLogin.getByTestId

    // const emailInput = getByTestId('email')
    // const emailValue = faker.internet.email()

    // const passwordInput = getByTestId('password')
    // const passwordValue = faker.internet.password()

    // fireEvent.input(emailInput, {
    //   target: { value: emailValue }
    // })

    // fireEvent.input(passwordInput, {
    //   target: { value: passwordValue }
    // })

    // const submitButton = getByTestId('submit')
    // fireEvent.click(submitButton)

    const emailValue = faker.internet.email()
    const passwordValue = faker.internet.password()
    // No simultate valid submit passa os valores para os campos, clica no botão e dispara a função de submit do form que é chamar o authentication com o metodo auth, nesse caso vem da class AuthenticationSpy que é passada para o componente login que é passado para o formLogin
    simulateValidSubmit(sutLogin, emailValue, passwordValue)

    expect(authenticationSpy.params).toEqual({
      email: emailValue,
      password: passwordValue
    })
  })

  // Validamos se chamamos somente uma vez o Authentication
  test('Should call Authentication only once', () => {
    const { sutLogin, authenticationSpy } = makeSutLogin({
      validationError: false
    })

    // Estamos simulando dois cliques no botão de submit
    simulateValidSubmit(sutLogin)
    simulateValidSubmit(sutLogin)

    // Esperamos que ele chame somente uma vez, porque a autenticação é uma chamada assincrona, ou seja, ja vai estar no processo de autenticação
    expect(authenticationSpy.callsCount).toBe(1)
  })

  // Testando se o botão de submit esta desabilitado
  test('Should not call Authentication if form is invalid', () => {
    // Agora possui um erro message, logo o form é invalido, porque somente o email esta preenchido
    const { getByTestId, authenticationSpy } = makeSutLogin()

    populateEmailField(getByTestId)
    fireEvent.submit(getByTestId('form'))

    // Esperamos que ele não chame a autenticação, porque o form esta invalido, somente o email esta preenchido
    expect(authenticationSpy.callsCount).toBe(0)
  })

  // Nesse teste, testamos se o erro é exibido na tela caso de errado a autenticação
  test('Should preset error if Authentication fails', async () => {
    const { sutLogin, getByTestId, authenticationSpy } = makeSutLogin({
      validationError: false
    })
    const error = new InvalidCredentialsError()
    // Mocamos o retorno do authentication para ser um erro, porque o padrão dele é retornar um Promise.resolve(this.account) quando passamos os valores corretos, mas nesse caso queremos testar o erro caso de errado no envio das credenciais. Lembrando que isso para ocorrer não pode ter o erro dos campos(errorMessage) no validationSpy, porque eles estão preenchidos corretamente, o erro é na autenticação, logo validationError: false
    jest
      // Espionamos o auth e retornamos um reject com o erro, em vez do accountModel
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))

    simulateValidSubmit(sutLogin)

    const errorWrap = getByTestId('error-wrap')

    // Basicamente ele vai esperar que o erro seja exibido na tela, ou seja, o erro que foi passado no reject, porque como é uma promise, o main-error ainda não vai estar em tela quando cair no catch do formLogin, porque ele é uma promise, então ele vai esperar que algo mude no errorWrap para dar continuidade no teste, ou seja, o main-error so aparece quando setamos o valor do erro no estado dele no formLogin dentro do catch depois que a promise é rejeitada
    await waitFor(() => errorWrap)

    // Eu espero que o erro seja exibido na tela e tem que ter a mensagem do erro
    const mainError = getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)

    // Eu espero que o erro seja exibido, somente ele, e que o spinner não esteja em tela. Ou seja, somente um filho no error-wrap
    expect(errorWrap.childElementCount).toBe(1)
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { sutLogin, getByTestId, authenticationSpy } = makeSutLogin({
      validationError: false
    })

    simulateValidSubmit(sutLogin)

    // Depois que eu chamar o submit, eu fico olhando para o form e depois que ele der um reloading
    await waitFor(() => getByTestId('form'))

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken
    )
  })

  // eslint-disable-next-line no-only-tests/no-only-tests
  test.only('Should go to signup page', async () => {
    const { getByTestId } = makeSutLogin({
      validationError: false
    })

    // Verifica se estamos inicialmente na rota inicial
    expect(window.location.pathname).toBe(
      ConfigRoute.fourDev.default.source.path
    )

    const signup = getByTestId('signup')
    fireEvent.click(signup)

    // Verifica se estamos agora na rota /signup
    expect(window.location.pathname).toBe(ConfigRoute.fourDev.signup.path)
    // Verifica se o historico de navegação tem 2 itens, porque ele vai ter o / e o signup
    expect(window.history.length).toBe(2)
  })
})
