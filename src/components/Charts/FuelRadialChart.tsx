import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { Spinner } from 'flowbite-react'
import type { Fuel } from '@prisma/client'

import { FuelEnum } from '../../utils/enums'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface FuelTypes {
  biodiesels?: number | null
  biogases?: number | null
  coal?: number | null
  oil?: number | null
  gas?: number | null
  otherBiomass?: number | null
  sustainableBiomass?: number | null
  otherRenewable?: number | null
  otherNonRenewable?: number | null
}

const FuelRadialChart: FC<{ source: Fuel | null }> = ({ source }) => {
  const [series, setSeries] = useState([0, 0, 0, 0])
  const getPercentage = (value: number, total: number) => {
    return Math.round((value / total) * 100)
  }

  const getLabels = (fuels: Fuel) => {
    const labels: string[] = []

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, companyId, year, ...rest } = fuels
    Object.keys(rest).forEach((key) => {
      if (
        rest[key as keyof FuelTypes] !== null &&
        rest[key as keyof FuelTypes] !== 0 &&
        key != 'totalConsumption'
      ) {
        labels.push(FuelEnum[key as keyof typeof FuelEnum])
      }
    })

    return labels
  }

  useEffect(() => {
    if (!source) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalConsumption, id, companyId, year, ...rest } = source
    const getExistingPercentages = (fuels: FuelTypes, total: number) => {
      const seriesPercentages: number[] = []

      Object.values(fuels).forEach((value) => {
        if (typeof value == 'number' && value !== 0)
          return seriesPercentages.push(getPercentage(value, total))
      })

      return seriesPercentages
    }
    if (source) {
      setSeries(getExistingPercentages(rest, totalConsumption ?? 1))
    }
  }, [source])

  if (!source)
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )

  const options: ApexOptions = {
    chart: {
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
    labels: getLabels(source),
    legend: {
      position: 'bottom',
      show: true,
    },
  }

  return (
    <>
      {getLabels(source).length > 0 && (
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height="auto"
          width="50%"
        />
      )}
    </>
  )
}

export default FuelRadialChart
