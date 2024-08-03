import { Navigate } from 'react-router-dom'

import { ConfigRoute } from '@/config/index'

export const PrivateRoute = () => {
  return <Navigate to={ConfigRoute.fourDev.login.path} />
}
