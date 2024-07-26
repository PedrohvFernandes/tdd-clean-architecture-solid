import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory'
import { makeSignupValidation } from './signup-validation-factory'

import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'
import { SignUp } from '@/main/presentation/pages/signup/signup'

export function MakeSignUp() {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
