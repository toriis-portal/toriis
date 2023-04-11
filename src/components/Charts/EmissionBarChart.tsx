import type { FC } from 'react'
import dynamic from 'next/dynamic'


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const EmissionBarChart: FC<{ emissionData: { x: string |undefined; y: number }[]}> = ({ emissionData }) => {

  const series = [
    {
      data: emissionData,
      name: "Emission Amount"
    },
  ]

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: false,
    },
  }

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="auto"
    />
  )
}

export default EmissionBarChart
