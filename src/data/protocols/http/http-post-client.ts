// Type alias
export type HttpPostParams = {
  url: string
  // caso queira passar um body(um objeto de qualquer coisa) ou header, email e senha, tokens de acesso, etc... outros params alem da url(obrigatoria) para o post,  e nem sempre o body e nem o header vai ser obrigatórios, então colocamos como opcional
}
// Colocamos somente o post nela, porque ela é responsável so por post, deixando ela com uma so responsabilidade, Solid - Single Responsibility Principle -> Melhor ter varias interfaces com uma so responsabilidade do que uma interface com varias responsabilidades, para que não precise implementar métodos que não são usados. Logo a interface HttpPostClient só tem o método post, e não tem o get, put, delete... e para os demais metodos criamos outras interfaces.
export interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>
}
