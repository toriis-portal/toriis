import type { FC } from 'react'
import React from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

import { api } from '../utils/api'
import data from '../info/home.json'
import { PrimaryButton } from '../components'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Landing: FC = () => {
  const source = api.company.countByInvestment.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  const firstLetter = clsx(
    'text-4xl first-letter:font-black first-letter:text-[#FFA902] font-medium',
  )
  const landingHeader = clsx('text-4xl font-medium')
  const textData = (data.landingText as { listItems: string[] }).listItems
  const landingTextStyle = clsx(
    'font-semibold underline decoration-[#FFA902] decoration-2 underline-offset-4',
  )

  if (!source.data) return <p> Loading...</p>

  const labels: string[] = source.data.map((dataKey) => {
    const obj: string = dataKey.sector as string
    return obj
  })

  const features: number[] = source.data.map((dataKey) => {
    const obj: number = dataKey._count.sector
    return obj
  })

  const options = {
    labels: labels,
    fontFamily: 'Klima',
    legend: { show: false },
    colors: ['#FFA902', '#FF6112', '#17292E', '#0F81E8'],
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '45%',
        },
      },
    },
  }
  const series = features
  return (
    <>
      <div className="min-h-screen">
        <div className="flex flex-wrap place-content-center space-x-4 pt-10">
          <span className={firstLetter}>Transparent</span>
          <span className={landingHeader}>and</span>
          <span className={firstLetter}>Open</span>
          <span className={firstLetter}>Resource</span>
          <span className={landingHeader}>for</span>
          <span className={firstLetter}>Institutional</span>
          <span className={firstLetter}>Investments</span>
        </div>
        <div className="mx-14 flex justify-center py-10">
          <div className="donut place-content-center px-14 pt-6">
            <Chart
              options={options}
              series={series}
              type="donut"
              width="400"
              height="400"
            />
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
              <PrimaryButton text="More About Fossil Fuels" link="" />
              <PrimaryButton text="Learn About Investment" link="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
