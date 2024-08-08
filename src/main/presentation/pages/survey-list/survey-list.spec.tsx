import { SurveyList } from './survey-list'

import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { mockSurveyListModel } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { render, screen, waitFor } from '@testing-library/react'

export class LoadSurveyListSpy implements LoadSurveyList {
  surveys = mockSurveyListModel()
  callsCount = 0
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++
    return this.surveys
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)

  return {
    loadSurveyListSpy
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

  test('Should render error on failure', async () => {
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
})
