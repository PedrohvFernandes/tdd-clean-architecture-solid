// import { GetStorage, SetStorage } from '@/data/protocols/cache'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

// export function makeLocalStorageAdapter(): SetStorage & GetStorage {
export function makeLocalStorageAdapter(): LocalStorageAdapter {
  return new LocalStorageAdapter()
}
