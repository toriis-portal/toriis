import type { FC } from 'react'

import HomeData from '../info/home.json'
import HighlightedTitle from '../components/Text/HighlightedTitle'
import { Carousel } from '../components'

const RefuteUISResponse: FC = () => {
  const leftText: string = HomeData.refuteResponse.leftText

  return (
    <div className="bg-clementine/20 px-12 py-20">
      <HighlightedTitle title="Refute UIS Response" />
      <div className="flex flex-row">
        <p className="basis-3/7 px-20 py-8 text-[28px] font-medium leading-tight">
          {leftText}
        </p>
        <div className="basis-4/7 pr-8">
          <Carousel
            carouselChildrenData={HomeData.refuteResponse.carouselItems}
          />
        </div>
      </div>
    </div>
  )
}

export default RefuteUISResponse
