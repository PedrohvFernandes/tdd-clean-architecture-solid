import { ConfigBase } from '@/config/index'
export function makeUrlApi(path: string): string {
  return `${ConfigBase.fourDev.baseUrls.apiUrl(path)}`
}
