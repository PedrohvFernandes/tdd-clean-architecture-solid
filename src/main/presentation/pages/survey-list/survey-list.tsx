import { ItemSurveyList } from './components/item-survey-list/item-survey-list'
import { ShimmerItemList } from './components/shimmer-item-list'

export function SurveyList() {
  return (
    <div className="flex flex-col self-center w-full max-w-[800px] flex-grow py-6 px-10 gap-10 bg-disabled-background">
      <h2 className="text-primary-DARK text-xl font-bold uppercase">
        Enquetes
      </h2>
      <ul className="flex flex-wrap justify-between gap-6">
        <ItemSurveyList />
        <ShimmerItemList />
      </ul>
    </div>
  )
}
