import { Icon, IconName } from '@/components/icon'

export function SurveyList() {
  return (
    <div className="flex flex-col self-center w-full max-w-[800px] flex-grow py-6 px-10 gap-10 bg-disabled-background">
      <h2 className="text-primary-DARK text-xl font-bold uppercase">
        Enquetes
      </h2>
      <ul className="flex flex-wrap justify-between gap-6">
        <li className="flex flex-col justify-between basis-[48%] h-64 bg-white rounded-lg shadow-shape">
          {/* <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradient-to-r to-primary-LIGHT from-primary-LIGHT  bg-size-58px"> */}
          <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradiente-to-right-primary-light  bg-size-58px rounded-lg relative">
            <Icon
              iconName={IconName.THUMBS_DOWN}
              className="absolute -top-3 -right-3 p-3"
            />

            <time className="flex flex-col bg-primary-LIGHT text-white rounded-lg ml-6 justify-center w-16 h-28 items-center flex-shrink-0 gap-1">
              <span className="text-5xl font-bold">05</span>
              <span className="text-sm lowercase">Set</span>
              <span>2021</span>
            </time>
            <p className="text-lg m-6">Qual é o seu framework web favorito ?</p>
          </div>
          <footer className="bg-primary text-white leading-10 lowercase text-center cursor-pointer hover:bg-primary-DARK transition-all rounded-b-lg">
            Ver Resultado
          </footer>
        </li>
      </ul>
    </div>
  )
}
