import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { Sector } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'
import { sectorEnum } from '../../utils/enums'
import { assetAmountToString } from '../../utils/helpers'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface companySectorCount {
  label: string
  count: number
}

const LandingDonutChart: FC = () => {
  const source = api.company.getNetAssetValBySector.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  if (!source.data)
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )

  const pairs: companySectorCount[] = source.data
    .filter((data) => data._sum.netAssetVal !== null)
    .map((data) => ({
      label: data.sector as Sector,
      count: data._sum.netAssetVal as number,
    }))

  /*
    This function cleans our input array of sectors by aggregating all sectors under a threshold,
    including any none-type sectors, into a category labeled "OTHER".
  */
  function cleanData(arr: companySectorCount[]) {
    const total = arr.reduce((sum, item) => sum + item.count, 0)
    const threshold = total * 0.04

    const filtered = arr
      .filter((item) => item.count >= threshold && item.label != null)
      .map((item) => ({
        label: sectorEnum[item.label as Sector],
        count: item.count,
      }))

    const newCount = arr
      .filter((item) => item.count < threshold || item.label === null)
      .reduce((sum, item) => sum + item.count, 0)

    filtered.push({ label: 'Other', count: newCount })

    return filtered
  }

  const labels: string[] = cleanData(pairs).map((dataKey) => dataKey.label)

  const sums: number[] = cleanData(pairs).map((dataKey) =>
    Math.round(dataKey.count),
  )

  const options = {
    labels: labels,
    tooltip: {
      y: {
        formatter: function (val: number) {
          return '$' + assetAmountToString(val)
        },
      },
    },
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
        series={sums}
        type="donut"
        width="100%"
        height="auto"
      />
    </>
  )
}

export default LandingDonutChart
