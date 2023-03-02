import type { FC } from 'react'
import React from 'react'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

import { api } from '../utils/api'

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const Landing: FC = () => {
  // const [labels, setLabels] = useState([])
  // const [count, setCount] = useState([])
  const hello = api.example.hello.useQuery({ text: 'Toriis' })
  // const source = api.example.countByInvestment.useQuery()

  return (
    <>
      <div>
        <text>
          {hello.data?.greeting ? hello.data.greeting : 'No investment'}
        </text>
      </div>
    </>
  )
}

export default Landing
