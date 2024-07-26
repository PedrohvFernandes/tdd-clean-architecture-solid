import { makeLoginValidation } from './login-validation-factory'

import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'
import { Login } from '@/presentation/pages/login'

export function MakeLogin() {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
