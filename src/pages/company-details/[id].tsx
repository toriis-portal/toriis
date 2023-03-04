import type { FC } from 'react'
import type { GetServerSideProps } from 'next'
import yahooFinance from 'yahoo-finance2'
import type { HistoricalResult } from 'yahoo-finance2/dist/esm/src/modules/historical'
import { useEffect, useState } from 'react'

import { prisma } from '../../server/db'
import { getCompanyTicker } from '../../server/api/routers/company'

interface CompanyDetailsProps {
  ticker: string
  costData: DateClosePair[] | JSON | string
  valid: boolean
}

export const getServerSideProps: GetServerSideProps<
  CompanyDetailsProps
> = async ({ params }) => {
  let companyID: string
  let data: DateClosePair[] | JSON | string = 'No historical data found'
  let val = false // assumes an error will occur, set to true after data validation

  // grab companyID from url params
  if (params?.id) {
    // if an ID exists in URL, it should be a company ID
    companyID = params.id as string

    // retrieve ticker by companyID
    // case 1: t = 'NO_TICKER_FOUND' -> companyID is valid & stored in DB but no ticker exists
    // case 2: t = 'Invalid CompanyID: No Ticker Found' -> companyID is invalid and/or not stored in DB
    // case 3: t = TICKER -> companyID is valid & stored in DB with an existing ticker
    const t = await getCompanyTicker({
      prisma: prisma,
      input: companyID,
    })

    let res: HistoricalResult | string

    // case 0
    if (t === 'NO_TICKER_FOUND') {
      data = 'No historical data found: no ticker exists for this company'

      // case 1
    } else if (t === 'Invalid CompanyID: No Ticker Found') {
      data = 'No historical data found: this company does not exist'

      // case 3
    } else {
      // query yahoo-finance2 using valid ticker
      const query = t

      // query data from period1 (past) to today (present)
      const options = {
        period1: '2022-02-01',
      }

      // await result, if valid then populate data and return valid
      await yahooFinance
        .historical(query, options)
        .then((ret) => {
          res = JSON.stringify(ret)
          data = JSON.parse(res) as DateClosePair[]
          val = true
        })
        .catch(() => {
          // if invalid, populate data with an error message and leave valid = false
          data = 'No historical data found'
        })
    }

    return {
      props: {
        ticker: t,
        costData: data,
        valid: val,
      },
    }
  } else {
    // unable to retreive id from params, invalid case
    return {
      props: {
        ticker: 'Unable to retrieve company details',
        costData: 'No historical data found',
        valid: val,
      },
    }
  }
}

interface DateClosePair {
  date: string
  close: number // closing cost on date
}

// given a JSON data object
function createData(costData: DateClosePair[]): DateClosePair[] {
  const data: DateClosePair[] = costData
  let display: DateClosePair[] = []

  if (typeof data !== 'string' && data) {
    data.map((obj: DateClosePair) => {
      const day: string = new Date(obj.date).toLocaleDateString()
      const closingPrice: number = obj.close
      const insert: DateClosePair = {
        date: day,
        close: closingPrice,
      }

      display.push(insert)
    })
    const length = display.length
    if (length > 100) {
      display = display.slice(length - 100)
    }
    return display.reverse()
  } else {
    return []
  }
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({
  ticker,
  costData,
  valid,
}) => {
  // set to an empty array first
  const [display, setDisplay] = useState<DateClosePair[]>([])

  useEffect(() => {
    // only call if data is a JSON object populated with closing cost history
    // set our display data accordignly
    if (valid && typeof costData !== 'string') setDisplay(createData(costData))
    // otherwise set display to empty
  }, [costData, valid]) // rerender if any of these values change to avoid hydration errors

  // handles hydration error, if the display is empty then do not render first
  return (
    <>
      {/* render only one of error message or details, this logic format avoids
      hydration errors */}
      {((!display.length || !valid) && typeof costData === 'string' && (
        <div>
          <p>{costData}</p>
        </div>
      )) ||
        (display.length && valid && typeof costData !== 'string' && (
          <div>
            <table>
              <tbody>
                <tr>
                  <th>{ticker + "'"}s Closing Cost History</th>
                </tr>

                {typeof costData !== 'string' &&
                  display.map(({ date, close }: DateClosePair) => (
                    <tr key={ticker + date}>
                      <td>{date}</td>
                      <td>${close.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
    </>
  )
}

export default CompanyDetails
