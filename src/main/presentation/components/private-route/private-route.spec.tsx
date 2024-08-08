import { Outlet, Route, Router, Routes } from 'react-router-dom'

import { ApiContext } from '../../contexts/api/api-context'
import { SurveyList } from '../../pages/survey-list/survey-list'
import { LoadSurveyListSpy } from '../../pages/survey-list/survey-list.spec'
import { PrivateRoute } from './private-route'

import { ConfigRoute } from '@/config/index'
import { mockAccountModel } from '@/domain/test'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: [ConfigRoute.fourDev.surveyList.path] // Ponto de partida /survey-list
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
          {/* Aqui é tipo o arquivo routes.tsx nesse caso esse route aqui é o pai e os routes abaixo dele filho. Para cada rota privada fazemos isso. No do professor passamos direto o PrivateRoute e nele o caminho. No fim da no mesmo. O que acontece aqui é que a rota usada aqui,. agora é previda, ao fazer isso validamos se o usuario tem ou não o token, se tiver ele libera o Route de baixo, porque dentro do PrivateRoute ocorre essa verificação e dentro dele o children para receber um componente de default com header, footer... e com o componente <Outlet/> que pega o componente da rota que ele está. Aqui no teste so passamos o <Outlet/> que ja é necessario. Caso se o nosso private route ja tivesse um <Outlet/> bastava somente passar a tag junto com a de fechamento aqui -->  <PrivateRoute />  */}
          <Route
            path={ConfigRoute.fourDev.default.source.path}
            element={
              <PrivateRoute>
                <Outlet />
              </PrivateRoute>
            }
          >
            <Route
              path={ConfigRoute.fourDev.surveyList.path}
              element={<SurveyList loadSurveyList={new LoadSurveyListSpy()} />}
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

  test('Should render current component if token is not empty', async () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.surveyList.path)
    await waitFor(() => screen.getByRole('heading'))
  })
})
