import type { FC } from 'react'
import dynamic from 'next/dynamic'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LandingDonutChart: FC = () => {
  const source = api.company.countBySector.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })
  if (!source.data) return <p className="h-96 w-96"> Loading...</p>

  interface dataObj {
    label: string
    count: number
  }

  const pairs: dataObj[] = source.data.map((data) => ({
    label: data.sector as string,
    count: data._count.sector,
  }))

  const total = pairs
    .map((item) => item.count)
    .reduce((prev, next) => prev + next)

  pairs.sort()

  console.log(pairs)

  // @TODO
  // populate new item
  // extract
  // pairs.map((item) =>
  //   item.count / total < 0.05 ? console.log(item) : console.log('Not'),
  // )

  const labels: string[] = source.data.map(
    (dataKey) => dataKey.sector as string,
  )

  const counts: number[] = source.data.map((dataKey) => dataKey._count.sector)

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
