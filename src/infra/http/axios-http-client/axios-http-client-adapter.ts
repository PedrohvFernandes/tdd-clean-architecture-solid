import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Dessa forma fazemos com que o axios dependa da minha interface HttpPostClient e o resto da aplicação nao dependa do axios
export class AxiosHttpClientAdapter implements HttpPostClient<any, any> {
  // Aqui como pode retornar qualquer coisa do Axios, usamos o any como generico
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      // Resposta positiva do axios
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      const err = error as AxiosError
      // Fiz isso porque o axios não retorna o statusCode e o body da resposta do axios quando a requisição não é bem sucedida(resolvida), erros como conexão com o servidor, etc. Porque na camada de data, onde usamos o post do axios, estamos validando somente quando o statusCode é OK, UNAUTHORIZED e erros não validados como default fica UnexpectedError
      const errorMessage =
        err.response?.status !== undefined &&
        (err.response as AxiosResponse<any>)
      // Resposta negativa do axios
      httpResponse = errorMessage as AxiosResponse<any>
    }
    // Retornamos o statusCode e o body da resposta do axios dependendo se a requisição foi bem sucedida(resolvida) ou não
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
