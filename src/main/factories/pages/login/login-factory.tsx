import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client/axios-http-client-adapter'
import { Login } from '@/presentation/pages/login'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

export function MakeLogin() {
  const url = 'https://fordevs.herokuapp.com/api/login'

  const axiosHttpClient = new AxiosHttpClientAdapter()

  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  const makeLoginValidation = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  return (
    <Login
      authentication={remoteAuthentication}
      validation={makeLoginValidation}
    />
  )
}
