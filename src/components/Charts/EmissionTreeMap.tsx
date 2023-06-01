import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { Spinner } from 'flowbite-react'
import type { ApexOptions } from 'apexcharts'

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
  name: string
}

interface SourceData {
  companyName: string
  companyId: string
  financedEmissions: number
  fossilFuelClass: string
}

const formatSeries = (data: (SourceData | null)[]): FossilFuelSeries[] => {
  const series: FossilFuelSeries[] = [
    {
      fossilFuelClass: 'y',
      name: 'Fossil Fuel Companies',
      data: [],
    },
    {
      fossilFuelClass: 'n',
      name: 'Other',
      data: [],
    },
  ]

  for (const emission of data) {
    if (!emission) continue
    const dataPoint: EmissionData = {
      x: emission.companyName,
      y: emission.financedEmissions,
      companyId: emission.companyId,
    }

    const index = series.findIndex(
      (item) => item.fossilFuelClass === emission.fossilFuelClass,
    )

    series[index]?.data.push(dataPoint)
  }

  return series
}

const EmissionTreeMap: FC = () => {
  const { data } = api.company.getEmissionsAndFFClass.useQuery<SourceData[]>(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  )

  if (!data)
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
    legend: {
      show: true,
    },
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
          _event: React.SyntheticEvent,
          _chartContext: ApexOptions,
          config: { seriesIndex: number; dataPointIndex: number },
        ) => {
          const selectedDataPoint =
            series[config.seriesIndex]?.data[config.dataPointIndex]
          const companyId = selectedDataPoint?.companyId
          const url = `https://www.toriis.earth/company/${companyId ?? ''}`
          window.open(url, '_blank')
        },
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
    },
  }

  const series: FossilFuelSeries[] = formatSeries(data)

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
