import type { FC } from 'react'
import dynamic from 'next/dynamic'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LandingDonutChart: FC = () => {
  const source = api.company.countBySector.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  if (!source.data) return <p className="h-96 w-96"> Loading...</p>

  const pairs: dataObj[] = source.data.map((data) => ({
    label: data.sector as string,
    count: data._count.sector,
  }))

  interface dataObj {
    label: string
    count: number
  }

  /*
   * newCount is populated with the total count of companies from sectors that occupy < 5% of the donut chart.
   */
  let newCount = pairs
    .filter((item) => item.count < 23)
    .reduce((prev, curr) => prev + curr.count, 0)

  /*
   * We will also add the count of companies that do not belong to a sector.
   */
  newCount += pairs.find((item) => item.label === 'NONE')?.count ?? 0

  /*
   * We are adding a new sector named 'OTHERS' and populating with newCount.
   */
  pairs.push({ label: 'OTHERS', count: newCount })

  /*
   * Helper function to remove item from object array.
   */
  function removeItem(value: dataObj) {
    const index = pairs.indexOf(value)
    if (index > -1) {
      pairs.splice(index, 1)
    }
    return pairs
  }

  /*
   * We are now parsing through the area and removing the sectors that now fall under the OTHERS category.
   */
  pairs.map((item) => {
    item.count < 23 || item.label == 'NONE'
      ? removeItem(item)
      : console.log('Fine')
  })

  const labels: string[] = pairs.map((dataKey) => dataKey.label)

  const counts: number[] = pairs.map((dataKey) => dataKey.count)

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
