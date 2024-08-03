import { Route, Router, Routes } from 'react-router-dom'

import { ApiContext } from '../../contexts/api/api-context'
import { SurveyList } from '../../pages/survey-list/survey-list'
import { PrivateRoute } from './private-route'

import { ConfigRoute } from '@/config/index'
import { mockAccountModel } from '@/domain/test'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: [ConfigRoute.fourDev.default.source.path] // Ponto de partida /
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
          {/* Aqui é tipo o arquivo routes.tsx nesse caso esse route aqui é o pai e os routes abaixo dele filho. Para cada rota privada fazemos isso. No do professor passamos direto o PrivateRoute e nele o caminho. No fim da no mesmo. O que acontece aqui é que a rota usada aqui,. agora é previda, ao fazer isso validamos se o usuario tem ou não o token, se tiver ele libera o Route de baixo, porque dentro do PrivateRoute ocorre essa verificação e dentro dele o componente <Outlet/> que pega o componente da rota que ele está */}
          <Route
            path={ConfigRoute.fourDev.default.source.path}
            element={<PrivateRoute />}
          >
            <Route
              path={ConfigRoute.fourDev.default.source.path}
              element={<SurveyList />}
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
      name: 'any_name'
    }) // Forçar o token a ser nulo
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)
  })

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe(
      ConfigRoute.fourDev.default.source.path
    )
  })
})
