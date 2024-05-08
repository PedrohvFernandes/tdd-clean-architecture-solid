import { SetStorage } from '../protocols/cache'

export class SetStorageSpy implements SetStorage {
  value: any
  key: string = ''

  set(key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
    return Promise.resolve()
  }
}
