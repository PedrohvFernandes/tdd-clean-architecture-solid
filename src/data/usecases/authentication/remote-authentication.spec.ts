import { RemoteAuthentication } from './remote-authentication'

import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { mockAuthenticationModel, mockAuthentication } from '@/domain/test'
// import { AuthenticationParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

// Podemos ter diversos testes de authentication, tendo um arquivo para cada teste
// Esse caso vamos pegar de uma api por isso remote, poderia ter um local authentication que pegaria os dados de um cash.

// TypeAlias
type SutTypes = {
  sut: RemoteAuthentication
  // httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
  httpPostClientSpy: HttpPostClientSpy<RemoteAuthentication.Model>
}

// Criamos um factory(design pattern) para criar o SUT, para evitar de ficar mudando o construtor toda vez que precisar mudar algo, porque aos poucos vai ter mais dependências e evitar de modificar a implementação do SUT toda vez que precisar mudar algo, usamos esse design pattern para evitar isso. Ele gera o SUT tendo acesso a todas as dependências que ele precisa, e se precisar mudar algo, muda só no factory
// Como a url não vamos se preocupar com ele em nenhum teste, somente com o correct URL  para garantir a integração dele, então injetamos a url como parametro, colocando um valor padrão, porque tanto faz o valor, porque não estamos testando a url de fato, mas sim se o método foi chamado com o valor correto, logo quando for testar outra coisa não precisa ficar passando a url pro makeSut
// Usamos o faker para gerar uma URL "valida", em vez de setar qualquer string 'any_url'
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  // Mock
  // Vamos criar um mock para testar, se o retorno funciona e se o remote vai funcionar com a resposta dele
  // Helper
  // const httpPostClientSpy = new HttpPostClientSpy<
  //   AuthenticationParams,
  //   AccountModel
  // >()
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAuthentication.Model>()

  // System Under Test - SUT - Nomenclatura para facilmente saber qual objeto estamos testando nessa class e é ela quem vai implementar o método que estamos testando auth() do usecase authentication. A gente implementa ela para o teste, com mocks, passando o post e a url fake, e la nela ela usa o post do spy e a url fake
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

// Ele vai depender de uma abstração de http, que é o HttpPostClient, uma interface, e a camada de infra vai implementar essa interface HttpPostClient definindo o framework que vamos usar. Quem estamos testando --> RemoteAuthentication
describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    // Criamos a url somente para injetar no make sut
    // const url = 'other_url'

    // Usando o faker para gerar uma URL "valida", em vez de setar qualquer string
    const url = faker.internet.url()

    const { sut, httpPostClientSpy } = makeSut(url)

    // No metodo auth chamamos o post do httpPostClientSpy, e passamos a url fake, junto com o mock do body
    sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url) // Verifica se o método foi chamado com o valor correto
  })

  // Body --> Corpo da requisição(Email e senha)
  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    // Como o faker gerar um email e senha aleatório toda vez que chama a função do factory, então salvamos em uma variavel, para comparar com o body
    const authenticationParams = mockAuthentication()

    sut.auth(authenticationParams)

    // To equal compara os valores dos objetos
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  // Testando casos de erro: 401, porque iremos usar esse status code na camada de UI, logo temos que testar. Com isso, testamos se esta retornando a exceção correta
  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    // Setamos(mocamos) o statusCode para 401 para o mock do HttpPostClient Spy, que foi passado para o sut RemoteAuthentication em makeSut
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.UNAUTHORIZED
    }

    const promiseErrorException = sut.auth(mockAuthentication())

    // Nos esperamos que HttPostClient do Spy, retorne na resposta dele um 401(unauthorized) para o auth do Remote, então esperamos que o sut tenha uma exceção de credenciais inválidas
    await expect(promiseErrorException).rejects.toThrow(
      new InvalidCredentialsError()
    )
  })

  // Para os erros 400, 500 e 404, retornamos o mesmo erro, UnexpectedError
  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.BAD_REQUEST
    }

    const promiseErrorException = sut.auth(mockAuthentication())

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.SERVER_ERROR
    }

    const promiseErrorException = sut.auth(mockAuthentication())

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND
    }

    const promiseErrorException = sut.auth(mockAuthentication())

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  // O teste de sucesso é o mais importante, porque é o que vai retornar o objeto que a camada de UI vai usar para mostrar ao usuário se ele está autenticado ou não
  test('Should return an Authentication.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const httpResult = mockAuthenticationModel()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: {
        accessToken: httpResult.accessToken,
        name: httpResult.name
      }
    }

    const account = await sut.auth(mockAuthentication())

    // To equal compara os valores dos objetos
    expect(account).toEqual(httpResult)
  })
})
