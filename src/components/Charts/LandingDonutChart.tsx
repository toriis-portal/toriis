import type { FC } from 'react'
import dynamic from 'next/dynamic'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LandingDonutChart: FC = () => {
  const source = api.company.countBySector.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  if (!source.data) return <p className="h-96 w-96"> Loading...</p>

  const pairs: dataObj[] = source.data.map((data) => ({
    label: data.sector as string,
    count: data._count.sector,
  }))

  interface dataObj {
    label: string
    count: number
  }

  // populate the OTHERS item
  let newCount = pairs
    .filter((item) => item.count < 23)
    .reduce((prev, curr) => prev + curr.count, 0)

  newCount += pairs.find((item) => item.label === 'NONE')?.count ?? 0

  pairs.push({ label: 'OTHERS', count: newCount })

  // remove item helper function
  function removeItem(value: dataObj) {
    const index = pairs.indexOf(value)
    if (index > -1) {
      pairs.splice(index, 1)
    }
    return pairs
  }

  // remove items below threshold 5%
  function cleanData(pairs: dataObj[]) {
    pairs.map((item) => {
      item.count < 23 ? removeItem(item) : console.log('Fine')
    })
    pairs.map((item) => {
      item.label == 'NONE' ? removeItem(item) : console.log('Fine')
    })
  }

  cleanData(pairs)

  console.log(pairs)

  const labels: string[] = pairs.map((dataKey) => dataKey.label)

  const counts: number[] = pairs.map((dataKey) => dataKey.count)

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

  return (
    <>
      <Chart
        options={options}
        series={counts}
        type="donut"
        width="100%"
        height="auto"
      />
    </>
  )
}

export default LandingDonutChart
