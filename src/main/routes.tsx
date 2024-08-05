import React, { ComponentType } from 'react'
import {
  createBrowserRouter,
  Navigate
  //  createMemoryRouter
} from 'react-router-dom'

import { PrivateRoute } from './presentation/components/private-route/private-route'
import { PublicRoute } from './presentation/components/public-route/public-route'

import { ConfigRoute } from '../config/'
import { MakeLogin } from './factories/pages/login/login-factory'
import { MakeSignUp } from './factories/pages/signup/signup-factory'
import { DefaultLayoutLogged } from './presentation/layouts'
import { SurveyList } from './presentation/pages/survey-list/survey-list'

import { DefaultLayout } from '@/layouts/default-layout'

// Definindo o tipo do componente de layout
// Tipos dos layouts
type LayoutComponent = ComponentType<{ children?: React.ReactNode }>

type LayoutType = 'Logged' | 'Default'

// Mapeia os tipos para os componentes de layout
const layoutMap: Record<LayoutType, LayoutComponent> = {
  Logged: DefaultLayoutLogged,
  Default: DefaultLayout
}

interface IMainLayoutProps {
  isPrivate: boolean
  Layout: LayoutType
}

// Layout para gerenciar os diferentes headers
const MainLayout = ({ isPrivate, Layout }: IMainLayoutProps) => {
  const LayoutComponent = layoutMap[Layout]
  if (isPrivate) {
    return (
      // O PrivateRoute é um componente que verifica se o usuário está logado, se não estiver ele redireciona para a página de login. Ele recebe um filho e nesse caso como nossa aplicação tem os default que possui o componente <Outlet /> para pegar tudo que vier abaixo, fazemos isso:
      <PrivateRoute>
        <LayoutComponent />
      </PrivateRoute>
    )
  }
  return (
    <PublicRoute>
      <LayoutComponent />
    </PublicRoute>
  )
}

export const Router = createBrowserRouter([
  {
    path: ConfigRoute.fourDev.default.source.path,
    element: <MainLayout isPrivate={false} Layout="Default" />,
    children: [
      {
        path: ConfigRoute.fourDev.default.source.path,
        element: <Navigate to={ConfigRoute.fourDev.login.path} />
      },
      {
        path: ConfigRoute.fourDev.login.path,
        element: <MakeLogin />
      },
      {
        path: ConfigRoute.fourDev.signup.path,
        element: <MakeSignUp />
      }
    ]
  },
  {
    path: ConfigRoute.fourDev.default.source.path,
    element: <MainLayout isPrivate={true} Layout="Logged" />,
    children: [
      {
        path: ConfigRoute.fourDev.surveyList.path,
        element: <SurveyList />
      }
    ]
  },

  {
    path: ConfigRoute.fourDev.default.notFound,
    element: <h1>Not Found</h1>
  }
])

// import {
//   createBrowserRouter
//   //  createMemoryRouter
// } from 'react-router-dom'

// import { PrivateRoute } from './presentation/components/private-route/private-route'

// import { ConfigRoute } from '../config/'
// import { MakeLogin } from './factories/pages/login/login-factory'
// import { MakeSignUp } from './factories/pages/signup/signup-factory'
// import { DefaultLayoutLogged } from './presentation/layouts'
// import { SurveyList } from './presentation/pages/survey-list/survey-list'

// import { DefaultLayout } from '@/layouts/default-layout'

// export const Router = createBrowserRouter([
//   {
//     path: ConfigRoute.fourDev.default.source.path,
//     element: <DefaultLayout />,
//     children: [
//       {
//         path: ConfigRoute.fourDev.login.path,
//         element: <MakeLogin />
//       },
//       {
//         path: ConfigRoute.fourDev.signup.path,
//         element: <MakeSignUp />
//       },
//       {
//         path: ConfigRoute.fourDev.default.source.path,
//         element: (
//           // O PrivateRoute é um componente que verifica se o usuário está logado, se não estiver ele redireciona para a página de login. Ele recebe um filho e nesse caso como nossa aplicação tem os default que possui o componente <Outlet /> para pegar tudo que vier abaixo, fazemos isso:
//           <PrivateRoute>
//             <DefaultLayoutLogged />
//           </PrivateRoute>
//         ),
//         children: [
//           {
//             path: ConfigRoute.fourDev.surveyList.path,
//             element: <SurveyList />
//           }
//         ]
//       }
//     ]
//   },

// {
//   path: ConfigRoute.fourDev.logged.path,
//   element: <PrivateRoute />,
//   children: [
//     {
//       path: ConfigRoute.fourDev.logged.path,
//       element: <DefaultLayoutLogged />,
//       children: [
//         {
//           path: ConfigRoute.fourDev.logged.next.surveyList.path,
//           element: <SurveyList />
//         }
//       ]
//     }
//   ]
// },

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
