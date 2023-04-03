import type { FC } from 'react'
import dynamic from 'next/dynamic'
import type { Sector } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'
import { sectorEnum } from '../../utils/enums'
import { assetAmountToString } from '../../utils/helpers'

interface companySectorCount {
  label: string
  count: number
}

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
      data: Object.entries(source.data).map(([x, y]) => ({ x, y })),
    },
  ]

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  }

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="auto"
      />
    </div>
  )
}

export default EmissionBarChart
