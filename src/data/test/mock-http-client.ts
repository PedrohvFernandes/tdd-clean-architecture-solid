/*
  Dentro da pasta do test vamos colocar todas as versões spy que são tipo as implementações da camada de infra para data usando a interface do data layer, logo as spy são consideradas como um mock, são as versões mocadas Spy da verdadeira implementação na camada de infra, porque quase todos os casos de uso vão utilizar httpClient --> Post, get... então nada melhor que separar e se tornar algo único para reaproveitar esse mock em vários lugares

  Aqui vamos colocar todos os mocks que tiverem haver com httpclient, não precisa ser so o post, pode ser o get, put, delete, patch, etc...
*/

import { HttpPostClient, HttpPostParams } from 'data/protocols/http'

// Spy é um duble de teste, é um tipo de mock, que serve para duas coisas:
// Spy é um objeto que vai espionar o método, e não vai fazer nada, só vai verificar se o método foi chamado com o valor correto
/*
  Ele coloca valor fake nas respostas do metodos(ex: post)
  Ele cria variáveis auxiliareis para capturar valores para fazer comparação

  basicamente ele substitui a implementação original por outra que vai nos ajudar a testar, uma classe/arquivo de teste, ele faz o papel do infra que "implementa" a interface do data layer

  Basicamente essa é a implementação do post fake
*/
class HttpPostClientSpy implements HttpPostClient {
  url?: string
  // Object porque pode ter qualquer coisa, email, senha, token, etc...
  body?: object

  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}

export { HttpPostClientSpy }
