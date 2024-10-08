import { ReactNode } from 'react'
import {
  Navigate
  // Outlet
} from 'react-router-dom'

import { ConfigRoute } from '@/config/index'
import { useHookApi } from '@/main/hooks/use-hook-api-context'

interface IPrivateRouteProps {
  children: ReactNode
}

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { getCurrentAccount } = useHookApi()

  if (!getCurrentAccount() || !getCurrentAccount().accessToken) {
    return <Navigate to={ConfigRoute.fourDev.login.path} />
  }

  return children
}

// /* eslint-disable prettier/prettier */
// import { Navigate, Outlet } from 'react-router-dom'

// import { ConfigRoute } from '@/config/index'
// import { useHookApi } from '@/main/hooks/use-hook-api-context'

// export const PrivateRoute = () => {
//   const { getCurrentAccount } = useHookApi()

//   return getCurrentAccount().accessToken
//     ? (
//     <Outlet />
//       )
//     : (
//     <Navigate to={ConfigRoute.fourDev.login.path} />
//       )
// }
