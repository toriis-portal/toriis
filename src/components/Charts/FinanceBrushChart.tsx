import type { ApexOptions } from 'apexcharts'
import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { HistoricalRowHistory } from 'yahoo-finance2/dist/esm/src/modules/historical'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const ChartLine = dynamic(() => import('react-apexcharts'), { ssr: false })

interface FinanceBrushChartProps {
  companyId: string
}

// data structure for chart
interface DateClosePair {
  x: Date // date, called x for apex
  y: number // closing cost, called y for apex
}

export const FinanceBrushChart: FC<FinanceBrushChartProps> | null = ({
  companyId,
}) => {
  const { data, isLoading, isError } =
    api.company.getCompanyFinanceData.useQuery(
      { id: companyId },
      { refetchOnWindowFocus: false, enabled: !!companyId, retry: false },
    )

  const d = new Date()
  const y = d.getFullYear() - 1
  d.setFullYear(y)

  console.log(d)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }

  if (isError || !data) {
    return null
  }

  const chartData: DateClosePair[] = data.map(
    (history: HistoricalRowHistory) => ({
      x: history.date,
      y: history.close,
    }),
  ) // {date: Date, close: number}

  const labels: number[] = data.map(
    (history: HistoricalRowHistory) => history.close,
  )

  const options: ApexOptions = {
    chart: {
      id: 'yahooChart',
      toolbar: {
        autoSelected: 'pan',
        show: true,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    colors: ['#546E7A'],
    stroke: {
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
  }

  const lineOptions: ApexOptions = {
    chart: {
      id: 'Below',
      brush: {
        target: 'yahooChart',
        enabled: true,
      },
      selection: {
        enabled: true,
      },
    },
    colors: ['#008FFB'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      },
    },

    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      tickAmount: 2,
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
      <div>
        <Chart
          options={options}
          width="100%"
          height="100%"
          series={series}
          type="line"
          labels={labels}
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

  // return (
  //   <>
  //     <div className="flex flex-col items-center px-12">
  //       <HighlightedTitle
  //         title="Error Displaying Chart"
  //         size="large"
  //         color="clementine"
  //       />
  //     </div>
  //   </>
  // )
}

export default FinanceBrushChart
