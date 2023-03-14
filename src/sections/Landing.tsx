import type { FC } from 'react'
import React from 'react'
import clsx from 'clsx'

import data from '../info/home.json'
import { PrimaryButton } from '../components'
import CapitalizedTitle from '../components/Text/CapitalizedTitle'
import LandingDonutChart from '../components/Charts/LandingDonutChart'

const Landing: FC = () => {
  const textData = data.listItems
  const landingTextStyle = clsx(
    'font-semibold underline decoration-clementine decoration-2 underline-offset-4',
  )

  return (
    <div className="flex flex-col items-center justify-center">
      <CapitalizedTitle />
      <div className="flex min-w-[900px] max-w-[1600px] flex-row items-center justify-center px-14 py-10">
        <div className="basis-3/7 pr-[2em] pt-6">
          {/* <LandingDonutChart /> */}
        </div>
        <div className="basis-4/7">
          <p className="pr-14 md:mb-8">
            <span>{textData[0]}</span>
            <span className={landingTextStyle}>{textData[1]}</span>
            <span>{textData[2]}</span>
            <span className={landingTextStyle}>{textData[3]}</span>
          </p>
          <p className="pr-14 md:my-8">
            <span>{textData[4]}</span>
            <span className={landingTextStyle}>{textData[5]}</span>
          </p>
          <div className="mt-4 flex flex-row gap-12">
            <PrimaryButton text="More About Fossil Fuels" link="/fossil-fuel" />
            <PrimaryButton text="Learn About Investment" link="/investments" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
