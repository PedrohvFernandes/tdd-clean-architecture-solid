import { FooterItemSurveyList } from './item-survey-list/footer-item-survey-list'
import { ParagraphItemSurveyList } from './item-survey-list/paragraph-item-survey-list'

export const ShimmerItemList = () => {
  return (
    <li className="flex flex-col justify-between basis-[100%] smartphone-md:basis-[48%] h-64 bg-white rounded-lg shadow-shape bg-no-repeat bg-gradient-to-r to-disabled-background from-disabled-background bg-size-w-64px-h-112px bg-position-ml-24px-h-52px relative after:animate-shimmer after:absolute after:w-full after:h-full after:top-0 after:left-0 after:-translate-x-full after:bg-gradiente-shimmer overflow-hidden">
      <ParagraphItemSurveyList className="m-0 absolute top-[80px] left-[112px] w-[140px] h-4 bg-disabled-background" />
      <ParagraphItemSurveyList className="m-0 absolute top-[100px] left-[112px] w-[120px] h-4 bg-disabled-background" />
      <ParagraphItemSurveyList className="m-0 absolute top-[120px] left-[112px] w-[160px] h-4 bg-disabled-background" />

      <FooterItemSurveyList className="bg-disabled-background absolute bottom-0 right-0 hover:bg-disabled-background cursor-auto" />
    </li>
  )
}
