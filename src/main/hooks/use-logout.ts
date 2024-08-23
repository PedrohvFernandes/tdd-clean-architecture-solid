/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom'

import { useHookApi } from './use-hook-api-context'

import { ConfigRoute } from '@/config/index'

type ResultType = {
  logout: () => void
}

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useHookApi()
  const navigate = useNavigate()
  return {
    logout: () => {
      setCurrentAccount(undefined as any)
      navigate(ConfigRoute.fourDev.login.path)
    }
  }
}
