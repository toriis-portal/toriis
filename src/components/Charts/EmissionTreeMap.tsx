import type { FC } from 'react'
import dynamic from 'next/dynamic'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

/* Interface */

interface FinancedEmissionsByCompany {
  company: string
  emissions: number
  classification: string
}

/* EmissionTreeMap component */

const EmissionTreeMap: FC = () => {
  const source = api.company.getEmissionsAndFFClass.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  if (source.isLoading) {
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )
  }

  if (source.isError || !source.data) {
    return <div>Error occurred while fetching data</div>
  }

  const emissions: FinancedEmissionsByCompany[] = source.data
    .filter((item) => item !== null) // Filter out null items
    .map((item) => ({
      company: item!.companyId, // Use non-null assertion operator
      emissions: item!.financedEmissions, // Use non-null assertion operator
      classification: item!.fossilFuelClass, // Use non-null assertion operator
    }))

  const options: ApexCharts.ApexOptions = {
    title: {
      text: 'Financed Emissions by Fossil Fuel Class and Company',
    },
    series: [
      {
        data: emissions.map((emission) => ({
          x: emission.classification,
          y: emission.emissions,
          label: emission.company,
        })),
      },
    ],
    legend: {
      show: false,
    },
  }

  return (
    <>
      <Chart options={options} type="treemap" width="100%" height="auto" />
    </>
  )
}

export default EmissionTreeMap
