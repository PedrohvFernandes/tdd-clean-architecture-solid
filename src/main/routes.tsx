import {
  createBrowserRouter
  //  createMemoryRouter
} from 'react-router-dom'

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
      },
      // {
      //   path: ConfigRoute.fourDev.default.source.path,
      //   element: <Login />
      // },
      {
        path: ConfigRoute.fourDev.signup.path,
        element: <h1>SignUp</h1>
      }
    ]
  },
  {
    path: ConfigRoute.fourDev.default.notFound,
    element: <h1>Not Found</h1>
  }
])

// export const Router = createMemoryRouter(
//   [
//     {
//       path: ConfigRoute.fourDev.default.source.path,
//       element: <DefaultLayout />,
//       children: [
//         {
//           path: ConfigRoute.fourDev.login.path,
//           element: <Login />
//         },
//         {
//           path: ConfigRoute.fourDev.signup.path,
//           element: <h1>SignUp</h1>
//         }
//       ]
//     },
//     {
//       path: ConfigRoute.fourDev.default.notFound,
//       element: <h1>Not Found</h1>
//     }
//   ],
//   {
//     initialEntries: [ConfigRoute.fourDev.login.path], // Podemos passar mais de uma rota
//     initialIndex: 0 // Ele começa na primeira rota que foi colocado no initialEntries.
//   }
// )
