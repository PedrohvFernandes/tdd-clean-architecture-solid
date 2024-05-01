import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client/axios-http-client-adapter'

export function makeAxiosHttpClient(): AxiosHttpClientAdapter {
  return new AxiosHttpClientAdapter()
}
