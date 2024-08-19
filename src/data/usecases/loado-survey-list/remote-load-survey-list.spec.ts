import { RemoteLoadSurveyList } from './remote-load-survey-list'

import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should throw UnexpectedError if HttpPostClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.FORBIDDEN
    }

    const promiseErrorException = sut.loadAll()

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.NOT_FOUND
    }

    const promiseErrorException = sut.loadAll()

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.SERVER_ERROR
    }

    const promiseErrorException = sut.loadAll()

    await expect(promiseErrorException).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an a list of SurveyModels if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    const httpResult = mockRemoteSurveyListModel()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.OK,
      body: httpResult
    }

    const surveyList = await sut.loadAll()

    // To equal compara os valores dos objetos
    expect(surveyList).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        answers: httpResult[0].answers,
        date: new Date(httpResult[0].date),
        didAnswer: httpResult[0].didAnswer
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        answers: httpResult[1].answers,
        date: new Date(httpResult[1].date),
        didAnswer: httpResult[1].didAnswer
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        answers: httpResult[2].answers,
        date: new Date(httpResult[2].date),
        didAnswer: httpResult[2].didAnswer
      },
      {
        id: httpResult[3].id,
        question: httpResult[3].question,
        answers: httpResult[3].answers,
        date: new Date(httpResult[3].date),
        didAnswer: httpResult[3].didAnswer
      }
    ])
  })

  test('Should return an empty lists if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.NO_CONTENT
    }

    const surveyList = await sut.loadAll()

    // To equal compara os valores dos objetos
    expect(surveyList).toEqual([])
  })
})
