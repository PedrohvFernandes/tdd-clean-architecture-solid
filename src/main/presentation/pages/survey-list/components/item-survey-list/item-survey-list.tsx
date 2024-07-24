import { Icon, IconName } from '@/main/presentation/components/icon'

import { FooterItemSurveyList } from './footer-item-survey-list'
import { ParagraphItemSurveyList } from './paragraph-item-survey-list'

export const ItemSurveyList = () => {
  return (
    <li className="flex flex-col justify-between  basis-[100%] smartphone-md:basis-[48%] h-64 bg-white rounded-lg shadow-shape">
      {/* <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradient-to-r to-primary-LIGHT from-primary-LIGHT  bg-size-58px"> */}
      <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradiente-to-right-primary-light  bg-size-58px rounded-lg relative">
        <Icon
          iconName={IconName.THUMBS_DOWN}
          className="absolute -top-3 -right-3 p-3"
        />

        <time className="flex flex-col bg-primary-LIGHT text-white rounded-lg ml-6 justify-center w-16 h-28 items-center flex-shrink-0 gap-1 ">
          <span className="text-5xl font-bold">05</span>
          <span className="text-sm lowercase">Set</span>
          <span>2021</span>
        </time>
        <ParagraphItemSurveyList>Ver resultado</ParagraphItemSurveyList>
      </div>
      <FooterItemSurveyList>Ver Resultado</FooterItemSurveyList>
    </li>
  )
}
