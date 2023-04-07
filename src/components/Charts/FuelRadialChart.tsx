import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const RadialFuelChart: FC = () => {
  const router = useRouter()
  const source = api.company.getFossilFuelsByCompany.useQuery(
    { companyId: (router?.query?.id ?? '') as string },
    {
      refetchOnWindowFocus: false,
    },
  )
  const totalConsumption = source?.data?.totalConsumption ?? 1

  const [series, setSeries] = useState([0, 0, 0, 0])
  const getPercentage = (value: number, total: number) => {
    return Math.round((value / total) * 100)
  }

  useEffect(() => {
    if (source.data) {
      const seriesPercentages = Object.values(source.data)
        .map((value) => {
          if (typeof value === 'number')
            return getPercentage(value, totalConsumption)
          else return 0
        })
        .slice(0, 4)

      setSeries(seriesPercentages)
    }
  }, [source.data, totalConsumption])

  if (!source.data)
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
        },
      },
    },
    labels: ['Coal', 'Oil', 'Gas', 'Sustainable Biomass'],
    legend: {
      position: 'bottom',
      show: true,
    },
  }

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height="auto"
        width="50%"
      />
    </>
  )
}

export default RadialFuelChart
