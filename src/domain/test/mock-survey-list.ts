// Objetos de mock para os testes do caso de uso de autenticação.

import { SurveyModel } from '../models'

import { faker } from '@faker-js/faker'

// Um factory para gerar um AccountModel fake
export const mockSurveyModel = (): SurveyModel => ({
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

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
]
