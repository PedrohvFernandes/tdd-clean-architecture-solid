import { Router } from 'react-router-dom'

import { ApiContext } from '../../contexts/api/api-context'
import { SurveyList } from './survey-list'

import { ConfigRoute } from '@/config/index'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test'
import { countQuantityRoute } from '@/utils/create-memory-history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
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
        getCurrentAccount: () => mockAccountModel()
      }}
    >
      <Router location={history.location} navigator={history}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    loadSurveyListSpy,
    history,
    setCurrentAccountMock
  }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    // li>footer:empty retorna todos os elementos footer que estão vazios dentro de um li
    expect(surveyList.querySelectorAll('li>footer:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    // Aqui o teste só finaliza quando o surveyList for renderizado vazio, porque não esperamos a promise do useEffect
    await waitFor(() => surveyList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
    // O teste so finaliza quando a função passada para o waitFor retornar verdadeiro, nesse caso caso na tela tenha um heading
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveyItems on success', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    // Espera até que o surveyList tenha sido renderizado, esperando que ele tenha 10 li, depois de concluir a promise do useEffect, por isso o await no waitFor antes do expect, pois aguardamos a promise do useEffect
    await waitFor(() => surveyList)

    expect(surveyList.querySelectorAll('li')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()

    const errorMessage = new UnexpectedError()

    // Mockando o loadAll para retornar um erro
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(errorMessage)
    makeSut(loadSurveyListSpy)
    // Esperamos o heading ser renderizado
    await waitFor(() => screen.getByRole('heading'))

    const surveyList = screen.queryByTestId('survey-list')

    expect(surveyList).not.toBeInTheDocument()

    const error = screen.getByTestId('error')

    expect(error).toHaveTextContent(errorMessage.message)
  })
  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()

    // Mockando o loadAll para retornar um erro
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy)
    // Esperamos o heading ser renderizado
    await waitFor(() => screen.getByRole('heading'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(history.location.pathname).toBe(ConfigRoute.fourDev.login.path)
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyListSpy)

    await waitFor(() => screen.getByRole('heading'))

    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument())
    fireEvent.click(screen.getByTestId('reload'))

    expect(loadSurveyListSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })
})
