import React from 'react'

import { twMerge } from 'tailwind-merge'

interface IParagraphItemSurveyListProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ParagraphItemSurveyList = ({
  ...props
}: IParagraphItemSurveyListProps) => {
  return (
    <p
      {...props}
      className={twMerge('text-lg m-6 flex-grow', props.className)}
      data-testid="question"
    />
  )
}
