import type { FC } from 'react'
import React from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

import { api } from '../utils/api'
import data from '../info/home.json'
import { PrimaryButton } from '../components'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Landing: FC = () => {
  const source = api.example.countByInvestment.useQuery(undefined, {
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

  if (!source.data) return <text> Loading...</text>

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
    legend: { show: false },
    colors: ['#FFA902', '#E6F0FA', '#FF6112', '#17292E', '#0F81E8'],
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

  console.log(labels)
  return (
    <>
      <div className="min-h-screen">
        <div className="flex place-content-center space-x-4 pt-16">
          <text className={firstLetter}>Transparent</text>
          <text className={landingHeader}>and</text>
          <text className={firstLetter}>Open</text>
          <text className={firstLetter}>Resource</text>
          <text className={landingHeader}>for</text>
          <text className={firstLetter}>Institutional</text>
          <text className={firstLetter}>Investments</text>
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
            <p className="pr-14">
              <text>{textData[0]}</text>
              <text className={landingTextStyle}>{textData[1]}</text>
              <text>{textData[2]}</text>
              <text className={landingTextStyle}>{textData[3]}</text>
            </p>
            <br></br>
            <p className="pr-14">
              <text>{textData[4]}</text>
              <text className={landingTextStyle}>{textData[5]}</text>
            </p>
            <br></br>
            <div className="flex gap-12 pt-4">
              <PrimaryButton
                text={textData[6] ? textData[6] : 'Loading'}
                link=""
              />
              <PrimaryButton
                text={textData[7] ? textData[7] : 'Loading'}
                link=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
