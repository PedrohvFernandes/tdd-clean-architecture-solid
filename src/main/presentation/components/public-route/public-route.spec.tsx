import { Outlet, Route, Router, Routes } from 'react-router-dom'

import { ApiContext } from '../../contexts/api/api-context'
import { PublicRoute } from './public-route'

import { ConfigRoute } from '@/config/index'
import { mockAccountModel } from '@/domain/test'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: [ConfigRoute.fourDev.login.path] // Ponto de partida /login
  })

  // Adicionar um listener para atualizar a lista de rotas visitadas sempre que a localização do histórico mudar
  history.listen((location) => {
    countQuantityRoute({
      location
    })
  })

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: () => {},
        getCurrentAccount: () => account
      }}
    >
      <Router location={history.location} navigator={history}>
        <Routes>
          <Route
            path={ConfigRoute.fourDev.login.path}
            element={
              <PublicRoute>
                <Outlet />
              </PublicRoute>
            }
          >
            <Route
              path={ConfigRoute.fourDev.login.path}
              element={<MakeLogin />}
            />
          </Route>
        </Routes>
      </Router>
    </ApiContext.Provider>
  )

  return { history }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut({
      accessToken: '',
      name: ''
    }) // Forçar o token a ser nulo
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)
  })

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.surveyList.path)
  })
})
