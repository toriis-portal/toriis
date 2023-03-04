import type { FC } from 'react'
import type { GetServerSideProps } from 'next'
import yahooFinance from 'yahoo-finance2'
import type { HistoricalResult } from 'yahoo-finance2/dist/esm/src/modules/historical'
import { useEffect, useState } from 'react'

import { prisma } from '../../server/db'
import { getCompanyTicker } from '../../server/api/routers/company'

interface CompanyDetailsProps {
  ticker: string
  cost: JSON | string
}

export const getServerSideProps: GetServerSideProps<
  CompanyDetailsProps
> = async ({ params }) => {
  let companyID: string
  // grab companyID from url params
  let data: JSON | string

  if (params?.id) {
    companyID = params.id as string

    // retrieve ticker by companyID
    const t = await getCompanyTicker({
      prisma: prisma,
      input: companyID,
    })

    // set props for component
    // some companyIDs are valid but do not have a valid ticker, their return value if it exists in DB is NO_TICKER_FOUND
    // for invalid companyIDs, getCompanyTicker will return 'Invalid CompanyID: No Ticker Found'
    let res: HistoricalResult | string
    if (t === 'NO_TICKER_FOUND') {
      data = 'No ticker found, no historical data found'
      //   data = 'No data found'
    } else {
      const query = t
      const options = {
        period1: '2022-02-01',
      }
      res = await yahooFinance.historical(query, options)
      //   res = await yahooFinance.search('AAPL')
      res = JSON.stringify(res)
      data = JSON.parse(res) as JSON
    }

    return {
      props: {
        ticker: t,
        cost: data,
      },
    }
  } else {
    // for invalid companyIDs that are not in DB, add this context to the ticker value
    return {
      props: {
        ticker: 'Invalid Company ID: NO_TICKER_FOUND',
        cost: 'data as string',
      },
    }
  }
}

interface DateClosePair {
  date: string
  close: number
}

function createData(cost: JSON): DateClosePair[] {
  const data: JSON = cost
  let display: DateClosePair[] = []

  if (typeof data !== 'string') {
    data.map((obj: DateClosePair) => {
      const day: string = new Date(obj.date).toLocaleString()
      const closingPrice: number = obj.close
      const insert: DateClosePair = {
        date: day,
        close: closingPrice,
      }

      display.push(insert)
      //   return (
      //     <p key={date.toDateString()}>
      //       {ticker} Closing cost on {date.toLocaleDateString()}: ${obj.close}
      //     </p>
      //   )
    })
    const length = display.length
    if (length > 100) {
      display = display.slice(length - 100)
    }
  }
  return display
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ ticker, cost }) => {
  //   const display: DateClosePair[] = []
  const [display, setDisplayState] = useState([])

  //   const data: JSON | string = cost
  //   const display: DateClosePair[] = []

  //   if (typeof data !== 'string') {
  //     data.map((obj: DateClosePair) => {
  //       const day: string = new Date(obj.date).toLocaleString()
  //       const closingPrice: number = obj.close
  //       const insert: DateClosePair = {
  //         date: day,
  //         close: closingPrice,
  //       }

  //       display.push(insert)
  //       //   return (
  //       //     <p key={date.toDateString()}>
  //       //       {ticker} Closing cost on {date.toLocaleDateString()}: ${obj.close}
  //       //     </p>
  //       //   )
  //     })
  //   }

  useEffect(() => {
    if (typeof cost !== 'string') setDisplayState(createData(cost))
  }, [cost, display])

  return (
    <>
      <div className="flex flex-col">
        {typeof cost !== 'string' &&
          display.map(({ date, close }) => (
            <p key={ticker + date}>
              {ticker} closing cost on {date}: ${close.toFixed(2)}
            </p>
          ))}
        <p>{ticker}</p>
      </div>
    </>
  )
}

export default CompanyDetails
