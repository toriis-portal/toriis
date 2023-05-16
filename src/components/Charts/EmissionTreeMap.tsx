import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { Sector } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'
import { sectorEnum } from '../../utils/enums'
import { assetAmountToString } from '../../utils/helpers'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface EmissionData {
  x: string
  y: number
}

interface FossilFuelSeries {
  fossilFuelClass: 'y' | 'n'
  data: EmissionData[]
}

const EmissionTreeMap: FC = () => {
  const source = api.company.getEmissionsAndFFClass.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  if (!source.data)
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )

  const options = {
    tooltip: {
      y: {
        formatter: function (val: number) {
          return assetAmountToString(val) + ' metric tons CO2'
        },
      },
    },
    fontFamily: 'Klima',
    legend: { show: false },
    colors: ['#FFA902', '#0F81E8', '#FF6112', '#17292E'],
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      treemap: {
        enableShades: false,
      },
    },
  }

  const emissionsAndFFClass = source.data as {
    companyId: string
    financedEmissions: number
    fossilFuelClass: 'y' | 'n'
  }[]

  const series: FossilFuelSeries[] = [
    {
      fossilFuelClass: 'y',
      data: [],
    },
    {
      fossilFuelClass: 'n',
      data: [],
    },
  ]

  for (const emission of emissionsAndFFClass) {
    const dataPoint: EmissionData = {
      x: emission.companyId,
      y: emission.financedEmissions,
    }

    const index = series.findIndex(
      (item) => item.fossilFuelClass === emission.fossilFuelClass,
    )

    if (
      series !== undefined &&
      index !== undefined &&
      series[index] !== undefined &&
      index !== -1
    ) {
      series[index].data.push(dataPoint)
    }
  }

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="treemap"
        width="100%"
        height="300"
      />
    </>
  )
}

export default EmissionTreeMap
