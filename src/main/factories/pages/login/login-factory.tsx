import { makeLoginValidation } from './login-validation-factory'

import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages/login'

export function MakeLogin() {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
