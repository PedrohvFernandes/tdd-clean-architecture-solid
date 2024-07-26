import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/usecases'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel | undefined

  async save(account: AccountModel): Promise<void> {
    this.account = account
    return Promise.resolve()
  }
}
