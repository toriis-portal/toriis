import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'
import { assetAmountToString } from '../../utils/helpers'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface EmissionData {
  x: string
  y: number
  companyId: string
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
    chart: {
      events: {
        dataPointSelection: (
          event: any,
          chartContext: any,
          config: { seriesIndex: number; dataPointIndex: number },
        ) => {
          const selectedDataPoint =
            series[config.seriesIndex].data[config.dataPointIndex]
          const companyId = selectedDataPoint?.companyId
          const url = `https://www.toriis.earth/company/${companyId ?? ''}`
          window.open(url, '_blank')
        },
      },
    },
  }

  const emissionsAndFFClass = source.data as {
    companyName: string
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
      x: emission.companyName,
      y: emission.financedEmissions,
      companyId: emission.companyId,
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
