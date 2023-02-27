import type { FC } from 'react'

import HomeData from '../info/home.json'
import HighlightedTitle from '../components/Text/HighlightedTitle'

const RefuteUISResponse: FC = () => {
  const leftText: string = HomeData.refuteResponse.leftText

  return (
    <div className="bg-clementine/20 px-12 py-20">
      <HighlightedTitle title="Refute UIS Response" />
      <div className="flex flex-row">
        <p className="basis-1/2 px-20 py-8 text-2.5xl leading-tight">
          {leftText}
        </p>
        <div className="basis-1/2 bg-clementine">carousel!</div>
      </div>
    </div>
  )
}

export default RefuteUISResponse
