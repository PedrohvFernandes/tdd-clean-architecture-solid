import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { AddAccount } from '@/domain/usecases'
import { makeUrlApi } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientAdapter } from '@/main/factories/http/axios-http-client-adapter-factory'

export function makeRemoteAddAccount(): AddAccount {
  return new RemoteAddAccount(
    makeUrlApi('/signup'),
    makeAxiosHttpClientAdapter()
  )
}
