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

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const EmissionBarChart: FC<{ companyId: string }> = (companyId) => {
  const source = api.company.getCompanyScope.useQuery(companyId, undefined, {
    refetchOnWindowFocus: false,
  })

  if (!source.data)
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )
  console.log(source.data)
  return (
    <div>
      {/* <Chart
            options={options}
            series={sums}
            type="bar"
            width="100%"
            height="auto"
        /> */}
    </div>
  )
}

export default EmissionBarChart
