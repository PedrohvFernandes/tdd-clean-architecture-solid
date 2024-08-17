import { GetStorage } from '@/data/protocols/cache'
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse
} from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      // Colocamos o token de acesso no header da requisição dentro de params. Dessa forma o token de acesso será enviado em todas as requisições que utilizarem o AuthorizeHttpGetClientDecorator. Para validar se o token de acesso está sendo enviado corretamente, se não tem alguem passando um token manualmente para o localStorage.
      // Object.assign(params, {
      //   headers: {
      //     'x-access-token': account.accessToken
      //   }
      // })

      // Aqui estamos fazendo a mesma coisa que o código acima, porém estamos utilizando o Object.assign para não sobrescrever o headers que já existem na requisição. Se ele já tiver headers, ele vai adicionar o token de acesso no header que já existe.
      Object.assign(params, {
        headers: Object.assign(
          {
            'x-access-token': account.accessToken
          },
          params.headers || {} // Se ele não tiver headers, ele vai passar um objeto vazio para não dar erro no Object.assign(
        )
      })
    }
    // Com ou sem token de acesso, a requisição é feita normalmente. Com isso iremos validar se o token de acesso está sendo enviado corretamente.
    const httpResponse = await this.httpGetClient.get(params)
    return httpResponse
  }
}
