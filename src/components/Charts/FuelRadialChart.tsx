import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'
import { Spinner } from 'flowbite-react'
import type { Fuel } from '@prisma/client'
import { setLazyProp } from 'next/dist/server/api-utils'

import { FuelEnum } from '../../utils/enums'

const MIN_VALUE = 0.005
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type FuelTypes = Omit<Fuel, 'id' | 'companyId' | 'year' | 'totalConsumption'>

/**
 * Gets the labels that have a non-null or non-zero value
 *
 * @param fuels - Fuel object to parse
 * @returns Labels that exist on the object
 */
const getLabels = (fuels: Fuel, setLabels: (labels: string[]) => void) => {
  const labels: string[] = []

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { totalConsumption, id, companyId, year, ...rest } = fuels
  Object.keys(rest).forEach((key) => {
    if (
      rest[key as keyof FuelTypes] !== null &&
      rest[key as keyof FuelTypes] !== 0 &&
      key != 'totalConsumption' &&
      totalConsumption &&
      (rest[key as keyof FuelTypes] ?? 0) / totalConsumption >= 0.005
    ) {
      labels.push(FuelEnum[key as keyof typeof FuelEnum])
    }
  })

  setLabels(labels)
  return labels
}

interface FuelRadialChartProps {
  source: Fuel
  setLabels: (labels: string[]) => void
}

/**
 * Renders radial chart for fuel data
 * @param source - Fuel object to parse and render
 * @returns - Radial chart
 */
const FuelRadialChart: FC<FuelRadialChartProps> = ({ source, setLabels }) => {
  const [series, setSeries] = useState([0, 0, 0, 0])

  const getPercentage = (value: number, total: number) => {
    return Math.round((value / total) * 100)
  }

  useEffect(() => {
    if (!source) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalConsumption, id, companyId, year, ...rest } = source

    /**
     * Gets the percentages of each item for the existing values on the fuels object
     *
     * @param fuels - fuel object to parse
     * @param total - total consumption of the fuel
     * @returns Percentages of each fuel item
     */
    const getExistingPercentages = (fuels: FuelTypes, total: number) => {
      const seriesPercentages: number[] = []

      Object.values(fuels).forEach((value) => {
        if (
          typeof value == 'number' &&
          value !== 0 &&
          value / total >= MIN_VALUE
        )
          return seriesPercentages.push(getPercentage(value, total))
      })

      return seriesPercentages
    }

    if (source) {
      setSeries(getExistingPercentages(rest, totalConsumption ?? 1))
    }
  }, [source])

  if (!source) {
    return (
      <div className="text-center">
        <Spinner color="info" />
      </div>
    )
  }

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
    labels: getLabels(source, setLabels),
    legend: {
      position: 'bottom',
      show: true,
    },
  }

  return (
    <>
      {getLabels(source, setLabels).length > 0 && (
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height="auto"
          width="100%"
        />
      )}
    </>
  )
}

export default FuelRadialChart
