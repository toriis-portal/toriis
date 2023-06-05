import type { FC } from 'react'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Spinner } from 'flowbite-react'
import type { ApexOptions } from 'apexcharts'

import { sectorEnum } from '../../utils/enums'
import { api } from '../../utils/api'
import { assetAmountToString } from '../../utils/helpers'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface EmissionData {
  x: string
  y: number
  companyId: string
}

interface FossilFuelSeries {
  fossilFuelClass: string
  data: EmissionData[]
  name: string
}

interface SourceData {
  companyName: string
  companyId: string
  financedEmissions: number
  netAssetVal: number
  fossilFuelClass: string
}

const formatSeries = (
  data: (SourceData | null)[],
  flag?: 'financedEmissions' | 'netAssetValue',
): FossilFuelSeries[] => {
  const series: FossilFuelSeries[] = [
    {
      fossilFuelClass: 'y',
      name: 'Fossil Fuel Companies',
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.FINANCIAL_SERVICES,
      name: sectorEnum.FINANCIAL_SERVICES,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.INDUSTRIALS,
      name: sectorEnum.INDUSTRIALS,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.TECHNOLOGY,
      name: sectorEnum.TECHNOLOGY,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.HEALTHCARE,
      name: sectorEnum.HEALTHCARE,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.CONSUMER_CYCLICAL,
      name: sectorEnum.CONSUMER_CYCLICAL,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.COMMUNICATION_SERVICES,
      name: sectorEnum.COMMUNICATION_SERVICES,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.CONSUMER_DEFENSIVE,
      name: sectorEnum.CONSUMER_DEFENSIVE,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.REAL_ESTATE,
      name: sectorEnum.REAL_ESTATE,
      data: [],
    },
    {
      fossilFuelClass: sectorEnum.BASIC_MATERIALS,
      name: sectorEnum.BASIC_MATERIALS,
      data: [],
    },
  ]

  for (const emission of data) {
    if (!emission) continue
    const yVal =
      flag === 'financedEmissions'
        ? emission.financedEmissions
        : emission.netAssetVal
    const dataPoint: EmissionData = {
      x: emission.companyName,
      y: yVal,
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

  const [selectedData, setSelectedData] = useState<FossilFuelSeries[]>([])

  useEffect(() => {
    if (data) {
      setSelectedData(formatSeries(data))
    }
  }, [data])

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
    colors: [
      '#FF6112',
      '#FFA902',
      '#FF4081',
      '#0F81E8',
      '#CD8500',
      '#4CAF50',
      '#AA66CC',
      '#40D7D4',
      '#335577',
      '#17292E',
    ],
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
          window.open(`/company/${companyId ?? ''}`, '_blank')
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

  const handleSwitchData = (data: FossilFuelSeries[]) => {
    setSelectedData(data)
  }

  return (
    <>
      <div>
        <button
          onClick={() =>
            handleSwitchData(formatSeries(data, 'financedEmissions'))
          }
        >
          All Data
        </button>
        <button
          onClick={() => handleSwitchData(formatSeries(data, 'netAssetValue'))}
        >
          Filtered Data
        </button>
      </div>
      <Chart
        options={options}
        series={selectedData}
        type="treemap"
        width="100%"
        height="300"
      />
    </>
  )
}

export default EmissionTreeMap
