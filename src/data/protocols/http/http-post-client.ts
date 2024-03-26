import { HttpResponse } from '.'

// Type alias
export type HttpPostParams = {
  url: string
  // caso queira passar um body(um objeto de qualquer coisa para a requisição http) ou header, tokens de acesso, body: email e senha, etc... outros params alem da url(obrigatoria) para o post,  e nem sempre o body e nem o header vai ser obrigatórios, então colocamos como opcional
  body?: object
}
// Colocamos somente o post nela, porque ela é responsável so por post, deixando ela com uma so responsabilidade, Solid - Single Responsibility Principle -> Melhor ter varias interfaces com uma so responsabilidade do que uma interface com varias responsabilidades, para que não precise implementar métodos que não são usados. Logo a interface HttpPostClient só tem o método post, e não tem o get, put, delete... e para os demais metodos criamos outras interfaces.
// HttpPostClient seria um meio de campo, logo o data layer(mediator) seria tambem um meio de campo, entre o infra/test (HttpPostClient) e o domain, sendo essa interface o componente que faz a requisição de verdade
export interface HttpPostClient {
  post(params: HttpPostParams): Promise<HttpResponse>
}
