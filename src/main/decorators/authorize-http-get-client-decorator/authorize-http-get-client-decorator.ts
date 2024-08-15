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
      Object.assign(params, {
        headers: {
          'x-access-token': account.accessToken
        }
      })
    }
    // Com ou sem token de acesso, a requisição é feita normalmente. Com isso iremos validar se o token de acesso está sendo enviado corretamente.
    await this.httpGetClient.get(params)
    return null as unknown as HttpResponse
  }
}
