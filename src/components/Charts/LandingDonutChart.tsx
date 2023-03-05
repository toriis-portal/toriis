import type { FC } from 'react'
import dynamic from 'next/dynamic'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LandingDonutChart: FC = () => {
  const source = api.company.countByInvestment.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })
  if (!source.data) return <p className="h-96 w-96"> Loading...</p>

  const labels: string[] = source.data.map(
    (dataKey) => dataKey.sector as string,
  )

  const features: number[] = source.data.map((dataKey) => dataKey._count.sector)

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
        series={features}
        type="donut"
        width="400"
        height="400"
      />
    </>
  )
}

export default LandingDonutChart
