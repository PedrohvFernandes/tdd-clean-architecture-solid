import { makeLocalStorageAdapter } from '../cache/local-storage-adapter-factory'
import { makeAxiosHttpClientAdapter } from '../http/axios-http-client-adapter-factory'

import { HttpGetClient } from '@/data/protocols/http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators/authorize-http-get-client-decorator/authorize-http-get-client-decorator'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClientAdapter()
  )
}
