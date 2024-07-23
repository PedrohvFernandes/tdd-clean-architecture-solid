import React from 'react'

import { twJoin } from 'tailwind-merge'

export function SurveyList() {
  const surveyCompleted = true

  return (
    <div className="flex flex-col self-center w-full max-w-[800px] flex-grow py-6 px-10 gap-10 bg-disabled-background">
      <h2 className="text-primary-DARK text-xl font-bold uppercase">
        Enquetes
      </h2>
      <ul className="flex flex-wrap justify-between gap-6">
        <li className="flex flex-col justify-between basis-[48%] h-64 bg-white rounded-lg shadow-shape">
          {/* <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradient-to-r to-primary-LIGHT from-primary-LIGHT  bg-size-58px"> */}
          <div className="flex justify-between flex-grow items-center bg-no-repeat bg-gradiente-to-right-primary-light  bg-size-58px rounded-lg relative">
            <div
              className={twJoin(
                'absolute -top-3 -right-3 p-3 rounded-full fle shadow-shadow-black',
                surveyCompleted ? 'bg-valid' : 'bg-invalid'
              )}
            >
              <img
                className=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA70lEQVQ4Ea2RPQoCQQyFZ/w5g72lYOEVPIiV2IkIHmCvIZ5D77BgZWtrYWe1ICiuL8tEwjIZZmYNZCf7knyTzRrjrK7rAfwAr+AheyNZwiei98gNrBkISxYjz5KbZb0V4gXxlN8jzo+1tk91BOT6nhPmOFNg1Nb0UiCNxY0Uu8QW044BuMIZHs3DJzcra3/yOgem3UoT3pEcaQUh3TchAX9/KNTsy/mAtLebrzhXI+AqE/oQl55ErIfYxp5WothW71QyAJ0VWKG06DJAQ/jTA0yH0TUAzf4Gc8BFC5g3GcHI3IQvBy0asesDsB08CfYFB/44kX6+Hj8AAAAASUVORK5CYII="
              />
            </div>

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
