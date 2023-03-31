import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { TRPCError } from '@trpc/server'
import dynamic from 'next/dynamic'

import { api } from '../../utils/api'
import { companyRouter } from '../../server/api/routers/company'

interface CompanyDetailsProps {
  id: string
}

const options: ApexOptions = {
  // series: [
  //   {
  //     data: data,
  //   },
  // ],
  chart: {
    id: 'chart2',
    type: 'line',
    height: 230,
    toolbar: {
      autoSelected: 'pan',
      show: false,
    },
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
  xaxis: {
    type: 'datetime',
  },
}

interface DateClosePair {
  date: string
  close: number // closing cost on date
}

// // given a JSON data object
// function createData(costData: DateClosePair[]): DateClosePair[] {
//   const data: DateClosePair[] = costData
//   // let display: DateClosePair[] = []

//   // if (typeof data !== 'string' && data) {
//   //   console.log(data)
//   //   data.map((obj: DateClosePair) => {
//   //     const day: string = new Date(obj.date).toLocaleDateString()
//   //     const closingPrice: number = obj.close
//   //     const insert: DateClosePair = {
//   //       date: day,
//   //       close: closingPrice,
//   //     }

//   //     display.push(insert)
//   //   })
//   //   const length = display.length
//   //   if (length > 100) {
//   //     display = display.slice(length - 100)
//   //   }
//   //   return display.reverse()
//   // } else {
//   return []
// }

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const CompanyDetails: FC<CompanyDetailsProps> = () => {
  // grab company_id from url
  const company_id: string = (useRouter().query.id as string) ?? ''

  // if the router is not yet initialized, set company_id to ''

  // state variables for enabling/disabling queries when inputs are invalid
  const [enabled, setEnabled] = useState(false)

  // state variables for enabling/disabling queries after response from api
  // const [querySuccess, setQuerySuccess] = useState(false)
  // console.log(enabled)

  // const priceData: any = ''

  // query becomes enabled as soon as company id is available

  // console.log('enabled before query: ', enabled)

  const { data, isLoading, isError, isSuccess } =
    api.company.getCompanyData.useQuery(
      { id: company_id },
      { enabled: enabled },
    )
  let dates: string[]
  let closings: number[]
  let options: unknown

  useEffect(() => {
    if (isError || isSuccess || !company_id) {
      setEnabled(false)
    } else if (!!company_id) {
      console.log('Set to true')
      setEnabled(true)
    }
  }, [isError, isSuccess, company_id])

  if (isError || isSuccess || !company_id) {
    if (isSuccess && !!data) {
      // cleanedData = data.map((obj) => ({
      //   date: obj.date.toLocaleDateString(),
      //   close: obj.close,
      // }))
      dates = data.map((obj) => obj.date.toLocaleDateString())
      closings = data.map((obj) => obj.close)
      console.log(dates)
      console.log(closings)

      if (!!dates && !!closings) {
        options = {
          labels: dates,
          fontFamily: 'Klima',
          legend: { show: false },
          colors: ['#FFA902', '#FF6112', '#17292E', '#0F81E8'],
          series: [
            {
              name: 'Dates',
              data: closings,
            },
          ],
        }
        return (
          <>
            <div>
              <p>Done Loading: Success!</p>
              <Chart
                options={options}
                series={closings}
                type="line"
                width="60%"
                height="50%"
              />
            </div>
          </>
        )
      }
    }
  }

  console.log(data)

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  if (isError) {
    return (
      <div>
        <p>Error</p>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <>
        <div>
          <p>Done Loading: Success!</p>
          <Chart
            options={options}
            // series={closings}
            type="line"
            width="60%"
            height="50%"
          />
        </div>
      </>
    )
  }
}

export default CompanyDetails
