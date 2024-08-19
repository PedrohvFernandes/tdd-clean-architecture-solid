export interface LoadSurveyList {
  // Metodo que carrega todas as listas
  loadAll(): Promise<LoadSurveyList.Model[]>
}

export namespace LoadSurveyList {
  export type SurveyAnswerModel = {
    image?: string
    answer: string
  }
  export type Model = {
    id: string
    question: string
    answers: SurveyAnswerModel[]
    date: Date
    didAnswer?: boolean
  }
}
