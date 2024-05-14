import {
  createBrowserRouter
  //  createMemoryRouter
} from 'react-router-dom'

import { ConfigRoute } from '../config/'
import { MakeLogin } from './factories/pages/login/login-factory'
import { SignUp } from './presentation/pages/signup/signup'

import { DefaultLayout } from '@/layouts/default-layout'

export const Router = createBrowserRouter([
  {
    path: ConfigRoute.fourDev.default.source.path,
    element: <DefaultLayout />,
    children: [
      {
        path: ConfigRoute.fourDev.login.path,
        element: <MakeLogin />
      },
      // {
      //   path: ConfigRoute.fourDev.default.source.path,
      //   element: <MakeLogin />
      // },
      {
        path: ConfigRoute.fourDev.signup.path,
        element: <SignUp />
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
