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
    'font-semibold underline decoration-[#FFA902] decoration-2 underline-offset-4',
  )

  return (
    <>
      <CapitalizedTitle />
      <div className="mx-14 flex justify-center py-10">
        <div className="donut place-content-center px-14 pt-6">
          <LandingDonutChart />
        </div>
        <div>
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
          <div className="flex gap-12 pt-4">
            <PrimaryButton text="More About Fossil Fuels" link="/fossil-fuel" />
            <PrimaryButton text="Learn About Investment" link="/investments" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
