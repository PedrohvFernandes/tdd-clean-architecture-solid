import { HttpResponse } from './http-response'

export interface HttpGetParams {
  url: string
}

// Quando criamos o get client ou post client a gente informa qual tipo de retorno vamos querer
export interface HttpGetClient<ResponseType = any> {
  get(params: HttpGetParams): Promise<HttpResponse<ResponseType>>
}
