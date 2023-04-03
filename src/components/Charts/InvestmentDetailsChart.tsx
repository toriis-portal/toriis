import type { ApexOptions } from 'apexcharts'
import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { HistoricalRowHistory } from 'yahoo-finance2/dist/esm/src/modules/historical'
import { Spinner } from 'flowbite-react'

import HighlightedTitle from '../Text/HighlightedTitle'
import { api } from '../../utils/api'

interface InvestmentDetailsChartProps {
  company_id: string // takes company id as arg
}

// data structure for chart
interface DateClosePair {
  x: Date // date, called x for apex
  y: number // closing cost, called y for apex
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
const ChartLine = dynamic(() => import('react-apexcharts'), { ssr: false })

export const InvestmentDetailsChart: FC<InvestmentDetailsChartProps> = ({
  company_id,
}) => {
  const { data, isLoading, isError, isSuccess } =
    api.company.getCompanyData.useQuery(
      { id: company_id },
      { refetchOnWindowFocus: false, enabled: !!company_id },
    )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <>
        <div className="flex flex-col items-center px-12">
          <HighlightedTitle
            title="Invalid Company or No Ticker Found"
            size="large"
            color="clementine"
          />
        </div>
      </>
    )
  }

  if (isSuccess && !!data) {
    const chartData: DateClosePair[] = data.map(
      (obj: HistoricalRowHistory) => ({ x: obj.date, y: obj.close }),
    ) // {date: Date, close: number}

    const labels: number[] = data.map((obj: HistoricalRowHistory) => obj.close)

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
      markers: {
        size: 0,
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
          xaxis: {
            max: new Date().getTime(),
          },
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
        {!!chartData && (
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
        )}
      </>
    )
  }
  return (
    <>
      <div className="flex flex-col items-center px-12">
        <HighlightedTitle
          title="Error Displaying Chart"
          size="large"
          color="clementine"
        />
      </div>
    </>
  )
}

export default InvestmentDetailsChart
