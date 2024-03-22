/* eslint-disable no-useless-constructor */

import { RemoteAuthentication } from './remote-authentication'

import { HttpPostClient } from 'data/protocols/http/http-post-client'

// Podemos ter diversos testes de authentication, tendo um arquivo para cada teste
// Esse caso vamos pegar de uma api por isso remote, poderia ter um local authentication que pegaria os dados de um cash.

// Ele vai depender de uma abstração de http, que é o HttpPostClient, uma interface, e a camada de infra vai implementar essa interface HttpPostClient definindo o framework que vamos usar. Quem estamos testando --> RemoteAuthentication
describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    // Spy é um duble de teste, é um tipo de mock, que serve para duas coisas:
    // Spy é um objeto que vai espionar o método, e não vai fazer nada, só vai verificar se o método foi chamado com o valor correto
    /*
      Ele coloca valor fake nas respostas do metodos(ex: post)
      Ele cria variáveis auxiliareis para capturar valores para fazer comparação

      basicamente ele substitui a implementação original por outra que vai nos ajudar a testar, uma classe de teste, ele faz o papel do infra que "implementa" a interface do data layer
    */
    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post(url: string): Promise<void> {
        this.url = url
        return Promise.resolve()
      }
    }

    // Mock
    const url = 'any_url' // tanto faz o valor, porque não estamos testando a url de fato, mas sim se o método foi chamado com o valor correto

    // Vamos criar um mock para testar, se o retorno funciona e se o remote vai funcionar com a resposta dele
    const httpPostClientSpy = new HttpPostClientSpy()

    // System Under Test - SUT - Nomenclatura para facilmente saber qual objeto estamos testando nessa class e é ela quem vai implementar o método que estamos testando auth() do usecase authentication. A gente implementa ela para o teste, com mocks, passando o post e a url fake, e la nela ela usa o post do spy e a url fake
    const sut = new RemoteAuthentication(url, httpPostClientSpy)

    // No metodo auth chamamos o post do httpPostClientSpy, e passamos a url fake
    sut.auth()

    expect(httpPostClientSpy.url).toBe(url) // Verifica se o método foi chamado com o valor correto
  })
})
