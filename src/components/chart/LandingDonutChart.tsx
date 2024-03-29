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

/**
 * Renders donut chart on the landing page
 *
 * @returns - Donut chart of company net asset value by sector
 */
const LandingDonutChart: FC = () => {
  const source = api.company.getNetAssetValBySector.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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

  /**
   * Aggregates all sectors under a threshold, including any none-type sectors, into a category labeled "OTHER"
   *
   * @param arr array of company labels mapped to net asset value sum
   * @returns parsed array with "Other" category
   */
  const aggregateSectors = (arr: companySectorCount[]) => {
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

  const labels: string[] = aggregateSectors(pairs).map(
    (dataKey) => dataKey.label,
  )
  const sums: number[] = aggregateSectors(pairs).map((dataKey) =>
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
