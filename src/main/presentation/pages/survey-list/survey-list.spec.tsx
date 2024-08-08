import { SurveyList } from './survey-list'

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

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
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

    expect(surveyList.querySelectorAll('li')).toHaveLength(10)
  })
})
