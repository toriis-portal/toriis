import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { Energy } from '@prisma/client'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface EnergyRadialChartProps {
  energyData: Energy
}

const EnergyRadialChart: FC<EnergyRadialChartProps> = ({ energyData }) => {
  const labels = ['Renewable Energy']

  // Calculate percentage of renewable energy (totalRenewableConsumption / totalConsumption)
  const data = [
    energyData.totalConsumption && energyData.totalRenewableConsumption
      ? (energyData.totalRenewableConsumption * 100) /
        energyData.totalConsumption
      : 0,
  ]

  const options = {
    labels: labels,
    fontFamily: 'Klima',
    legend: { show: false },
    colors: ['#0F81E8'],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          value: {
            formatter: function (val: number) {
              return val.toFixed(2).toString() + '%'
            },
          },
        },
      },
    },
  }

  return (
    <>
      <Chart
        options={options}
        series={data}
        type="radialBar"
        width="100%"
        height="auto"
      />
    </>
  )
}

export default EnergyRadialChart
