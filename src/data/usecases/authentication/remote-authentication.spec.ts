/* eslint-disable no-useless-constructor */

import { HttpPostClientSpy } from '../../test/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

// Podemos ter diversos testes de authentication, tendo um arquivo para cada teste
// Esse caso vamos pegar de uma api por isso remote, poderia ter um local authentication que pegaria os dados de um cash.

// Ele vai depender de uma abstração de http, que é o HttpPostClient, uma interface, e a camada de infra vai implementar essa interface HttpPostClient definindo o framework que vamos usar. Quem estamos testando --> RemoteAuthentication
describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
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
