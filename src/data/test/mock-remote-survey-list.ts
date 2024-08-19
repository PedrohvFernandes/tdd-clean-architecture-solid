// Objetos de mock para os testes do caso de uso de autenticação.

import { RemoteLoadSurveyList } from '@/data/usecases/loado-survey-list/remote-load-survey-list'
import { faker } from '@faker-js/faker'

// Um factory para gerar um AccountModel fake
export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
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
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean()
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel()
]
