import { Route, Router, Routes } from 'react-router-dom'

import { SurveyList } from '../../pages/survey-list/survey-list'
import { PrivateRoute } from './private-route'

import { ConfigRoute } from '@/config/index'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
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
    <Router location={history.location} navigator={history}>
      <Routes>
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
  )

  return { history }
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)
  })
})
