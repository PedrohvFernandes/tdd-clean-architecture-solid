/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  // Aqui como pode retornar qualquer coisa do Axios, usamos o any como generico
  async post(params: HttpPostParams<any>): Promise<void> {
    // await axios(params.url)
    await axios.post(params.url)
  }
}
