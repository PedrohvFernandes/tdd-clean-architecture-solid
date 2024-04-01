/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import axios from 'axios'

// Dessa forma fazemos com que o axios dependa da minha interface HttpPostClient e o resto da aplicação nao dependa do axios
export class AxiosHttpClientAdapter implements HttpPostClient<any, any> {
  // Aqui como pode retornar qualquer coisa do Axios, usamos o any como generico
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    // await axios(params.url)
    // O primeiro param é a url da API e o segundo é o body(data) da requisição
    const httpResponse = await axios.post(params.url, params.body)
    return {
      body: httpResponse.data,
      statusCode: httpResponse.status
    }
  }
}
