import type { FC } from 'react'
import React from 'react'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import { api } from '../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Landing: FC = () => {
  // const [labels, setLabels] = useState([])
  // const [count, setCount] = useState([])
  const hello = api.example.hello.useQuery({ text: 'Toriis' })
  const source = api.example.countByInvestment.useQuery()

  interface oldElem {
    sector: string | null
    _count: { sector: number }
  }

  const labels: string[] | undefined = source.data?.map((dataKey: oldElem) => {
    const obj: string | null = dataKey.sector
    return obj
  })

  const features: number[] | undefined = source.data?.map(
    (dataKey: oldElem) => {
      const obj: number = dataKey._count.sector
      return obj
    },
  )

  console.log(labels)
  console.log(features)

  return (
    <>
      <text>
        {hello.data?.greeting ? hello.data.greeting : 'No investment'}
      </text>
      {labels && features ? (
        <Chart
          type="donut"
          width={1300}
          height={500}
          series={features}
          // options={{ labels: { labels }, title: { Investments: string } }}
        ></Chart>
      ) : (
        <text>Nothing yet</text>
      )}
    </>
  )
}

export default Landing
