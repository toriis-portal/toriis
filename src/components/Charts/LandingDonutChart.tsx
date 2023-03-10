import type { FC } from 'react'
import dynamic from 'next/dynamic'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LandingDonutChart: FC = () => {
  const source = api.company.countBySector.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  if (!source.data) return <p className="h-96 w-96"> Loading...</p>

  const pairs: sector[] = source.data.map((data) => ({
    label: data.sector as string,
    count: data._count.sector,
  }))

  interface sector {
    label: string
    count: number
  }

  /*
    This function cleans our input array of sectors by aggregating all sectors under a threshold,
    including any none-type sectors, into a category labeled "OTHER".
  */
  function cleanData(arr: sector[]) {
    /*
     * Set total to calculate the threshold
     */
    const total = arr.reduce((sum, item) => sum + item.count, 0)
    const threshold = total * 0.05

    // This filtered array gives us everything that is above threshold
    const filtered = arr.filter(
      (item) => item.count >= threshold && item.label != 'NONE',
    )

    /*
     * newCount is populated with the total count of companies from sectors that occupy < 5% of the donut chart.
     */
    const newCount = arr
      .filter((item) => item.count < threshold || item.label === 'NONE')
      .reduce((sum, item) => sum + item.count, 0)

    // Then we can directly push to filtered array
    filtered.push({ label: 'OTHER', count: newCount })

    return filtered
  }

  const labels: string[] = cleanData(pairs).map((dataKey) => dataKey.label)

  const counts: number[] = cleanData(pairs).map((dataKey) => dataKey.count)

  const options = {
    labels: labels,
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
        series={counts}
        type="donut"
        width="100%"
        height="auto"
      />
    </>
  )
}

export default LandingDonutChart
