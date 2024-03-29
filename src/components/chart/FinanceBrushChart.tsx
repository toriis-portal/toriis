import type { ApexOptions } from 'apexcharts'
import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { HistoricalRowHistory } from 'yahoo-finance2/dist/esm/src/modules/historical'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'
import Toast from '../toast/Toast'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const ChartLine = dynamic(() => import('react-apexcharts'), { ssr: false })

interface FinanceBrushChartProps {
  companyId: string
}

interface DateClosePair {
  x: Date // date, called x for apex
  y: number // closing cost, called y for apex
}

/**
 * Renders a brush chart for a given company's closing market value from Yahoo Finance
 *
 * @param companyId The company id to get the finance data for
 * @returns Brush chart for the company's finance data
 */
export const FinanceBrushChart: FC<FinanceBrushChartProps> = ({
  companyId,
}) => {
  const today = new Date()
  const yearAgo = new Date()
  yearAgo.setFullYear(today.getFullYear() - 1)

  const { data, isLoading, isError, error } =
    api.company.getCompanyFinanceData.useQuery(
      { id: companyId, options: { period1: yearAgo.toDateString() } },
      { refetchOnWindowFocus: false, enabled: !!companyId, retry: false },
    )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }

  if (isError || !data) {
    return <Toast type="error" message={error.message}></Toast>
  }

  const chartData: DateClosePair[] = data.map(
    (history: HistoricalRowHistory) => ({
      x: history.date,
      y: history.close,
    }),
  )

  const options: ApexOptions = {
    chart: {
      id: 'FinanceBrushChart',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: (value: number) => {
          return '$' + value.toFixed(2).toString()
        },
      },
    },
    colors: ['#626161'],
    stroke: {
      width: 2,
    },

    fill: {
      opacity: 1,
    },
  }

  const lineOptions: ApexOptions = {
    chart: {
      id: 'ChartSelector',
      brush: {
        target: 'FinanceBrushChart',
        enabled: true,
      },
      selection: {
        enabled: true,
      },
    },
    colors: ['#0F81E8'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.9,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: "MMMM 'yy",
      },
    },
    yaxis: {
      tickAmount: 2,
      labels: {
        formatter: (value: number) => {
          return '$' + value.toFixed(2).toString()
        },
      },
    },
  }

  const series: ApexAxisChartSeries = [
    {
      name: 'Closing Cost (USD)',
      data: chartData,
    },
  ]

  return (
    <>
      <div className="flex-column">
        <Chart
          options={options}
          width="100%"
          height="100%"
          series={series}
          type="line"
        />
        <ChartLine
          options={lineOptions}
          width="100%"
          height="120px"
          series={series}
          type="area"
        />
      </div>
    </>
  )
}

export default FinanceBrushChart
