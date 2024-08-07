import React from 'react'

import { twMerge } from 'tailwind-merge'

interface IFooterItemSurveyListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const FooterItemSurveyList = ({
  ...props
}: IFooterItemSurveyListProps) => {
  return (
    <footer
      {...props}
      className={twMerge(
        `bg-primary text-white leading-10 lowercase text-center cursor-pointer hover:bg-primary-DARK transition-all rounded-b-lg ${props.className} h-10 w-full`
      )}
    />
  )
}
