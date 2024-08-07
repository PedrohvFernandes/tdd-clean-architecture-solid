import { SurveyList } from './survey-list'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { render, screen } from '@testing-library/react'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++
    return []
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
    expect(surveyList.querySelectorAll('li>footer:empty').length).toBe(4)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
