import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { Energy } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'
import { percentToTwoDecimals } from '../../utils/helpers'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface companyId {
  energyData: Energy
}

const EnergyRadialChart: FC<companyId> = ({ energyData }) => {
  const labels = ['Renewable Energy']
  if (
    energyData.totalRenewableConsumption === null ||
    energyData.totalConsumption === null
  ) {
    console.error('error')
    return null
  }
  const data = [
    percentToTwoDecimals(
      energyData.totalRenewableConsumption,
      energyData.totalConsumption,
    ),
  ]

  const options = {
    labels: labels,
    fontFamily: 'Klima',
    legend: { show: false },
    colors: ['#40D7D4'],
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
  }

  return (
    <>
      <Chart
        options={options}
        series={data}
        type="radialBar"
        width="200%"
        height="auto"
      />
    </>
  )
}

export default EnergyRadialChart
