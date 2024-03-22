// Colocamos somente o post nela, porque ela é responsável so por post, deixando ela com uma so responsabilidade, Solid - Single Responsibility Principle -> Melhor ter varias interfaces com uma so responsabilidade do que uma interface com varias responsabilidades, para que não precise implementar métodos que não são usados. Logo a interface HttpPostClient só tem o método post, e não tem o get, put, delete... e para os demais metodos criamos outras interfaces.
export interface HttpPostClient {
  post(url: string): Promise<void>
}
