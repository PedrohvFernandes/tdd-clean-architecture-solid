import {
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import axios, { AxiosError, AxiosResponse } from 'axios'

// Adaptador do Axios para a interface HttpPostClient. // Dessa forma fazemos com que o axios dependa da minha interface HttpPostClient e o resto da aplicação nao dependa do axios
// export class AxiosHttpClientAdapter implements HttpPostClient<any, any> {
// export class AxiosHttpClientAdapter implements HttpPostClient<any> {

// Como agora o HttpPostClient possui um so generico e o mesmo ja tem como padrão o any, não precisamos passar o <any>, pois o any ja é o padrão
export class AxiosHttpClientAdapter implements HttpPostClient {
  // O método post realiza uma requisição HTTP POST e retorna uma resposta // Aqui como pode retornar qualquer coisa do Axios, usamos o any como generico
  // async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      // Realiza a requisição POST usando o axios // Resposta positiva do axios
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      // na camada de data, onde usamos o post do axios, estamos validando somente quando o statusCode é OK, UNAUTHORIZED ou FORBIDDEN(add-account), e erros não validados como default fica UnexpectedError
      const err = error as AxiosError

      // Inicializa axiosResponse com valores padrão para status e data
      axiosResponse = {
        status: 500, // Código de status para erro interno do servidor
        data: 'Unexpected error', // Mensagem de erro padrão
        statusText: '',
        headers: {},
        config: {},
        request: {}
      } as AxiosResponse<any>

      // Verifica se a resposta do erro está definida, se sim atribui a axiosResponse, se não mantém os valores padrão de erro interno do servidor desconhecido
      if (err.response) {
        // Resposta negativa do axios
        axiosResponse = err.response
      }
    }
    // Retornamos o statusCode e o body da resposta do axios dependendo se a requisição foi bem sucedida(resolvida) ou não
    // Retorna o código de status e o corpo da resposta do axios
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get(params: HttpGetParams): Promise<void> {
    await axios.get(params.url)
  }
}
