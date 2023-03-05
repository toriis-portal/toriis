import type { FC } from 'react'
import dynamic from 'next/dynamic'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LandingDonutChart: FC = () => {
  const source = api.company.countByInvestment.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })
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
      <Chart
        options={options}
        series={series}
        type="donut"
        width="400"
        height="400"
      />
    </>
  )
}

export default LandingDonutChart
