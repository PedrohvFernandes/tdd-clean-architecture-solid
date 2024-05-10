import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client/axios-http-client-adapter'

export function makeAxiosHttpClientAdapter(): AxiosHttpClientAdapter {
  return new AxiosHttpClientAdapter()
}
