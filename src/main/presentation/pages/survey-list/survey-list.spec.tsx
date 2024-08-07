import { SurveyList } from './survey-list'

import { render, screen } from '@testing-library/react'

const makeSut = (): void => {
  render(<SurveyList />)
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    // li>footer:empty retorna todos os elementos footer que estão vazios dentro de um li
    expect(surveyList.querySelectorAll('li>footer:empty').length).toBe(4)
  })
})
