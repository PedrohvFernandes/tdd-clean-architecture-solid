import { SetStorage } from '@/data/protocols/cache'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

export function makeLocalStorageAdapter(): SetStorage {
  return new LocalStorageAdapter()
}
