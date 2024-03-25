import { mockAuthentication } from '../../../domain/test/mock-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

import { faker } from '@faker-js/faker'

// Podemos ter diversos testes de authentication, tendo um arquivo para cada teste
// Esse caso vamos pegar de uma api por isso remote, poderia ter um local authentication que pegaria os dados de um cash.

// TypeAlias
type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

// Criamos um factory(design pattern) para criar o SUT, para evitar de ficar mudando o construtor toda vez que precisar mudar algo, porque aos poucos vai ter mais dependências e evitar de modificar a implementação do SUT toda vez que precisar mudar algo, usamos esse design pattern para evitar isso. Ele gera o SUT tendo acesso a todas as dependências que ele precisa, e se precisar mudar algo, muda só no factory
// Como a url não vamos se preocupar com ele em nenhum teste, somente com o correct URL  para garantir a integração dele, então injetamos a url como parametro, colocando um valor padrão, porque tanto faz o valor, porque não estamos testando a url de fato, mas sim se o método foi chamado com o valor correto, logo quando for testar outra coisa não precisa ficar passando a url pro makeSut
// Usamos o faker para gerar uma URL "valida", em vez de setar qual string 'any_url'
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  // Mock
  // Vamos criar um mock para testar, se o retorno funciona e se o remote vai funcionar com a resposta dele
  // Helper
  const httpPostClientSpy = new HttpPostClientSpy()

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

    // Usando o faker para gerar uma URL "valida", em vez de setar qual string
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
})
