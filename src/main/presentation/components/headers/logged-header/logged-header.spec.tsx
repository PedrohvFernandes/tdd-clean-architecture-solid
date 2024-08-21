import { Router } from 'react-router-dom'

import { LoggedHeader } from './logged-header'

import { ConfigRoute } from '@/config/index'
import { ApiContext } from '@/main/presentation/contexts/api/api-context'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: any) => void
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({
    initialEntries: [ConfigRoute.fourDev.surveyList.path] // Ponto de partida /survey-list
  })

  // Adicionar um listener para atualizar a lista de rotas visitadas sempre que a localização do histórico mudar
  history.listen((location) => {
    countQuantityRoute({
      location
    })
  })

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

  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount wit null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)
  })
})
