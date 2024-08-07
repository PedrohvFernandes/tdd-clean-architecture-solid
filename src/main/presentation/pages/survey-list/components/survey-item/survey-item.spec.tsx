import { IconName } from '@/main/presentation/components/icon'

import { SurveyItem } from './survey-item'

import { mockSurveyModel } from '@/domain/test'
import { render, screen } from '@testing-library/react'

describe('SurveyItem Component', () => {
  test('Should present correct values', async () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true // Forçando a resposta para true, se respondido logo o icone será o de thumbs up

    survey.date = new Date('2021-09-05T00:00:00') // Forçando a data para 05/09/2021

    render(<SurveyItem survey={survey} />)
    const icon = screen.getByTestId('icon')
    expect(icon).toHaveProperty('src', IconName.THUMBS_UP)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('05')
    expect(screen.getByTestId('month')).toHaveTextContent('set')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})