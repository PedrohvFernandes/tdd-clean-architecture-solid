import { ReactNode } from 'react'
import {
  Navigate
  // Outlet
} from 'react-router-dom'

import { ConfigRoute } from '@/config/index'
import { useHookApi } from '@/main/hooks/use-hook-api-context'

interface IPublicRouteProps {
  children: ReactNode
}
export const PublicRoute = ({ children }: IPublicRouteProps) => {
  const { getCurrentAccount } = useHookApi()

  if (!getCurrentAccount() || !getCurrentAccount().accessToken) {
    return children
  }

  if (getCurrentAccount().accessToken) {
    return <Navigate to={ConfigRoute.fourDev.surveyList.path} />
  }
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
