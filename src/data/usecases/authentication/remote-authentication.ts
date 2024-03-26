// O infra layer é responsável por implementar as interfaces do data layer, pois é ele quem vai definir qual framework vai usar para implementar essas interfaces do data layer, enquanto o data layer é responsável por definir as interfaces que o infra layer vai implementar e usar elas como abstração
import { HttpPostClient } from '@/data/protocols/http'
import { AuthenticationParams } from '@/domain/usecases/authentication'

// Esse ja é para produção e o arquivo de cima é para teste
export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    // HttpPostClient --> Uma abstração, uma interface junto com o data layer, seria um dos metodos que o authentication ira fazer
    private readonly httpPostClient: HttpPostClient
  ) {}

  // Params --> Email e senha do usuário que deseja se autenticar
  async auth(params: AuthenticationParams): Promise<void> {
    // Não sabemos como esse post vai ser implementado, só sabemos que ele vai ser implementado no infra e pela camada de teste, tanto que podemos receber um httpPostClientSpy na classe de test no objeto makeSut como um httpAxiosPost(Nome de classe de exemplo implementada no infra layer)
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
