/*
  Dentro da pasta do test vamos colocar todas as versões spy que são tipo as implementações da camada de infra para data usando a interface do data layer, logo as spy são consideradas como um mock, são as versões mocadas Spy da verdadeira implementação na camada de infra, porque quase todos os casos de uso vão utilizar httpClient --> Post, get... então nada melhor que separar e se tornar algo único para reaproveitar esse mock em vários lugares

  Aqui vamos colocar todos os mocks que tiverem haver com httpclient, não precisa ser so o post, pode ser o get, put, delete, patch, etc...
*/

import { HttpStatusCode } from '../protocols/http/http-response'

import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'

// Spy é um duble de teste, é um tipo de mock, que serve para duas coisas:
// Spy é um objeto que vai espionar o método, e não vai fazer nada, só vai verificar se o método foi chamado com o valor correto
/*
  Ele coloca valor fake nas respostas do metodos(ex: post)
  Ele cria variáveis auxiliareis para capturar valores para fazer comparação

  basicamente ele substitui a implementação original por outra que vai nos ajudar a testar, uma classe/arquivo de teste, ele faz o papel do infra que "implementa" a interface do data layer

  Basicamente essa é a implementação do post fake
*/
// Deixamos o HttPostClientSpy generico, para que possamos passar qualquer tipo de body e receber o body de resposta esperado. Ex: No caso do RemoteAuthentication, ele vai passar um body do tipo AuthenticationParams e uma resposta do tipo AccountModel. Com isso o body da resposta e requisição fica generico
class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  // Tipamos o body como T, pois não sabemos o tipo de body que vai ser passado, então deixamos generico
  body?: T
  // Deixamos um valor default(mocado) so para teste, mas para cada teste pode ser diferente(ou seja, para cada teste podemos mocar um statusCode diferente), passamos um valor diferente para cada teste para simular uma resposta diferente caso o teste queira testar essa parte. Se não passar nada, enviamos um statusCode 200 OK, e o data layer vai tratar isso. O mesmo para o infra quando enviar a resposta do httPostClient para o data layer da API verdadeira que ele vai consumir
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.OK
  }

  async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    // Retornamos a resposta fake, que foi setada aqui e possivelmente no test, caso ele test alguma resposta error ou sucesso
    return Promise.resolve(this.response)
  }
}

export { HttpPostClientSpy }
