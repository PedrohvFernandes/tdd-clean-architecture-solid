import { SurveyModel } from '@/domain/models'

export interface LoadSurveyList {
  // Metodo que carrega todas as listas
  loadAll(): Promise<SurveyModel[]>
}
