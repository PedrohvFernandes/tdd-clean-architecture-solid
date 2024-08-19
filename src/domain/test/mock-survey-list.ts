// Objetos de mock para os testes do caso de uso de autenticação.

import { LoadSurveyList } from '../usecases/load-survey-list'

import { faker } from '@faker-js/faker'

// Um factory para gerar um AccountModel fake
export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.string.uuid(),
  question: faker.word.adjective(10),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.word.adjective(10)
    },
    {
      answer: faker.word.adjective(10)
    }
  ],
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean()
})

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]

export class LoadSurveyListSpy implements LoadSurveyList {
  surveys = mockSurveyListModel()
  callsCount = 0
  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveys
  }
}
