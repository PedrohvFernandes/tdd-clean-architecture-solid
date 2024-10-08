// O infra layer é responsável por implementar as interfaces do data layer, pois é ele quem vai definir qual framework vai usar para implementar essas interfaces do data layer, enquanto o data layer é responsável por definir as interfaces que o infra layer vai implementar e usar elas como abstração
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

// Esse ja é para produção e o arquivo de cima é para teste
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    // HttpPostClient --> Uma abstração, uma interface junto com o data layer, seria um dos metodos que o authentication ira fazer
    // Informamos o tipo de dados que o HttpPostClient ira receber, no caso AuthenticationParams para o body da requisição e AccountModel para o body da resposta da requisição
    // private readonly httpPostClient: HttpPostClient<
    //   AuthenticationParams,
    //   AccountModel
    // >
    private readonly httpPostClient: HttpPostClient<RemoteAuthentication.Model>
  ) {}

  // Params --> Email e senha do usuário que deseja se autenticar
  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    // Não sabemos como esse post vai ser implementado, só sabemos que ele vai ser implementado no infra e pela camada de teste, tanto que podemos receber um httpPostClientSpy na classe de test no objeto makeSut como um httpAxiosPost(Nome de classe de exemplo implementada no infra layer)
    // Pegamos a resposta do httpPostClient.post Spy(test) ou infra e salvamos na variavel httpResponse. Body e statusCode são os atributos que o post retorna definido pela interface http-response e passada para o post do httpPostClient como resposta
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    // Com base no statusCode do post(Spy(test) ou infra) da resposta, fazemos um switch para tratar os possíveis erros
    switch (httpResponse.statusCode) {
      // Lembrando que no mock Spy esta setado como padrão OK, caso algum teste não esteja testando o statusCode e para não dar problema para os demais testes que não esteja testando o statusCode setamos  ele como default no mock Spy de teste
      case HttpStatusCode.OK:
        return httpResponse.body as RemoteAuthentication.Model
      // Se o status for 401, Unauthorized, então lançamos um erro de credenciais inválidas
      case HttpStatusCode.UNAUTHORIZED:
        throw new InvalidCredentialsError()
      // Qual quer outra coisa que der errado, lançamos um erro inesperado
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
