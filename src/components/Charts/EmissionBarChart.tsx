import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { Emission } from '@prisma/client'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface EmissionBarChartProps {
  emissionData: Emission
}

const EmissionBarChart: FC<EmissionBarChartProps> = ({ emissionData }) => {
  const labels = ['Scope 1 Estimate', 'Scope 2 Estimate', 'Scope 3 Estimate']
  const scopeValues = [
    emissionData?.scopeOne ?? 0,
    emissionData?.scopeTwo ?? 0,
    emissionData?.scopeThree ?? 0.000001,
  ]

  const emissions = scopeValues.map((value, index) => ({
    x: labels[index],
    y: value,
  }))

  const series = [
    {
      data: emissions,
      name: 'Emission Amount',
    },
  ]

  const options = {
    tooltip: {
      y: {
        formatter: (value: number) => `${value} Metric tons CO2e`,
      },
    },
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
