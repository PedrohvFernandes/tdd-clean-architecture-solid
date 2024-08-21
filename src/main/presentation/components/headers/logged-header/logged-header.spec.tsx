import { Router } from 'react-router-dom'

import { LoggedHeader } from './logged-header'

import { ConfigRoute } from '@/config/index'
import { ApiContext } from '@/main/presentation/contexts/api/api-context'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory({
  initialEntries: [ConfigRoute.fourDev.surveyList.path] // Ponto de partida /survey-list
})

// Adicionar um listener para atualizar a lista de rotas visitadas sempre que a localização do histórico mudar
history.listen((location) => {
  countQuantityRoute({
    location
  })
})

describe('Header Component', () => {
  test('Should call setCurrentAccount wit null', () => {
    const setCurrentAccountMock = jest.fn()

    render(
      <ApiContext.Provider
        value={{
          setCurrentAccount: setCurrentAccountMock,
          getCurrentAccount: jest.fn()
        }}
      >
        <Router location={history.location} navigator={history}>
          <LoggedHeader />
        </Router>
      </ApiContext.Provider>
    )
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    console.log('history.location.pathname', history.location.pathname)
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)
  })
})
