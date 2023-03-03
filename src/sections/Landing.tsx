import type { FC } from 'react'
import React from 'react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'

import { api } from '../utils/api'
import data from '../info/home.json'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Landing: FC = () => {
  // const hello = api.example.hello.useQuery({ text: 'Toriis' })
  const source = api.example.countByInvestment.useQuery()
  const firstLetter = clsx(
    'text-4xl first-letter:font-black first-letter:text-[#FFA902] font-medium',
  )
  const landingHeader = clsx('text-4xl font-medium')

  if (!source.data) return <text> Loading...</text>

  interface oldElem {
    sector: string
    _count: { sector: number }
  }

  const labels: string[] = source.data.map((dataKey: oldElem) => {
    const obj: string = dataKey.sector
    return obj
  })

  const features: number[] = source.data.map((dataKey: oldElem) => {
    const obj: number = dataKey._count.sector
    return obj
  })

  const options = { labels: labels }
  const series = features

  console.log(labels)
  return (
    <>
      <div className="min-h-screen">
        <div className="donut">
          <Chart options={options} series={series} type="donut" width="800" />
        </div>
        <div className="flex place-content-center space-x-8 pt-16">
          <text className={firstLetter}>Transparent</text>
          <text className={landingHeader}>and</text>
          <text className={firstLetter}>Open</text>
          <text className={firstLetter}>Resource</text>
          <text className={landingHeader}>for</text>
          <text className={firstLetter}>Institutional</text>
          <text className={firstLetter}>Investments</text>
        </div>
        <div className="mx-14 flex justify-center gap-4">
          <text className="w-1/3 place-content-center">place chart here</text>
          <div>
            <text className="w-2/3">{data.landingTextOne}</text>
            <text className="w-2/3">{data.landingTextTwo}</text>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
