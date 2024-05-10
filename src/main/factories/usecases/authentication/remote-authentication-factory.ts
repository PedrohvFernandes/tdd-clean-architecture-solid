import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { Authentication } from '@/domain/usecases'
import { makeUrlApi } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientAdapter } from '@/main/factories/http/axios-http-client-adapter-factory'

export function makeRemoteAuthentication(): Authentication {
  return new RemoteAuthentication(
    makeUrlApi('/login'),
    makeAxiosHttpClientAdapter()
  )
}
