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
  name: string
  data: EmissionData[]
}

interface SourceData {
  companyName: string
  companyId: string
  financedEmissions: number
  netAssetVal: number
  fossilFuelClass: string
}

interface TreemapProps {
  flag: 'financedEmissions' | 'netAssetValue'
}

const formatSeries = (
  data: (SourceData | undefined)[],
  flag: 'financedEmissions' | 'netAssetValue',
): FossilFuelSeries[] => {
  const fossilFuelClass = ['Fossil Fuel Companies'].concat(
    Object.values(sectorEnum),
  )

  const series: FossilFuelSeries[] = fossilFuelClass.map((classification) => ({
    name: classification,
    data: [],
  }))

  data.forEach((company) => {
    if (!company) return
    const yVal =
      flag === 'financedEmissions'
        ? company.financedEmissions
        : company.netAssetVal
    const dataPoint = {
      x: company.companyName,
      y: yVal,
      companyId: company.companyId,
    }

    const index = series.findIndex(
      (item) => item.name === company.fossilFuelClass,
    )

    series[index]?.data.push(dataPoint)
  })

  return series.filter((item) => item.data.length > 0)
}

const EmissionTreeMap: FC<TreemapProps> = ({ flag }) => {
  const { data } = api.company.getEmissionsAndFFClass.useQuery<SourceData[]>(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  )

  const [selectedData, setSelectedData] = useState<FossilFuelSeries[]>([])

  useEffect(() => {
    if (data) {
      const formattedData = formatSeries(data, flag)
      setSelectedData(formattedData)
    }
  }, [data, flag])

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
          return flag === 'financedEmissions'
            ? assetAmountToString(val) + ' metric tons CO2'
            : '$' + assetAmountToString(val)
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
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 600,
          },
        },
      },
    ],
  }

  const series: FossilFuelSeries[] = formatSeries(data, flag)

  return (
    <Chart
      options={options}
      series={selectedData}
      type="treemap"
      width="100%"
      height="auto"
    />
  )
}

export default EmissionTreeMap
