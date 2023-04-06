import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const EmissionBarChart: FC<{ companyId: string }> = ({ companyId }) => {
  const source = api.company.getCompanyScope.useQuery(
    { companyId },
    {
      refetchOnWindowFocus: false,
    },
  )

  if (!source.data)
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )
  const labels = ['Scope 1 Estimate', 'Scope 2 Estimate', 'Scope 3 Estimate']
  const series = [
    {
      data: Object.entries(source.data).map(([x, y], index) => ({
        x: labels[index],
        y,
      })),
    },
  ]

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: false,
    },
  }

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="auto"
    />
  )
}

export default EmissionBarChart
