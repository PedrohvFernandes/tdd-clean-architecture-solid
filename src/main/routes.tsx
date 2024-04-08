import { createBrowserRouter } from 'react-router-dom'

import { ConfigRoute } from '../config/'

import { DefaultLayout } from '@/layouts/default-layout'
import { Login } from '@/pages/login'

export const Router = createBrowserRouter([
  {
    path: ConfigRoute.fourDev.default.source.path,
    element: <DefaultLayout />,
    children: [
      {
        path: ConfigRoute.fourDev.login.path,
        element: <Login />
      }
    ]
  }
])
