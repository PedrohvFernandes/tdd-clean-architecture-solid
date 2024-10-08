import { FooterItemSurveyList } from '../survey-item-list-components/footer-item-survey-list'
import { ParagraphItemSurveyList } from '../survey-item-list-components/paragraph-item-survey-list'
import { Icon, IconName } from '@/main/presentation/components/icon'

import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type SurveyItemProps = {
  survey: LoadSurveyList.Model
}

export const SurveyItem = ({ survey }: SurveyItemProps) => {
  const date = {
    day: survey.date.getDate().toString().padStart(2, '0'), // o padStart garante que sempre teremos 2 digitos, e caso não tenha ele preenche com 0. Ex: dia 2 -> 02, dia 12 -> 12
    month: survey.date
      .toLocaleString('pt-BR', { month: 'short' })
      .replace('.', ''),
    year: survey.date.getFullYear()
  }

  const iconName = survey.didAnswer ? IconName.THUMBS_UP : IconName.THUMBS_DOWN

  return (
    <li className="flex flex-col justify-between  basis-[100%] smartphone-md:basis-[48%] h-64 bg-white rounded-lg shadow-shape">
      {/* <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradient-to-r to-primary-LIGHT from-primary-LIGHT  bg-size-58px"> */}
      <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradiente-to-right-primary-light  bg-size-58px rounded-lg relative">
        <Icon iconName={iconName} className="absolute -top-3 -right-3 p-3" />

        <time className="flex flex-col bg-primary-LIGHT text-white rounded-lg ml-6 justify-center w-16 h-28 items-center flex-shrink-0 gap-1 ">
          <span data-testid="day" className="text-5xl font-bold">
            {date.day}
          </span>
          <span data-testid="month" className="text-sm lowercase">
            {date.month}
          </span>
          <span data-testid="year">{date.year}</span>
        </time>
        <ParagraphItemSurveyList>{survey.question}</ParagraphItemSurveyList>
      </div>
      <FooterItemSurveyList>Ver Resultado</FooterItemSurveyList>
    </li>
  )
}
