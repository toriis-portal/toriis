import type { FC } from 'react'
import type { GetServerSideProps } from 'next'
// import yahooFinance from 'yahoo-finance2'

import { prisma } from '../../server/db'
import { getCompanyTicker } from '../../server/api/routers/company'

interface CompanyDetailsProps {
  ticker: string
}

export const getServerSideProps: GetServerSideProps<
  CompanyDetailsProps
> = async ({ params }) => {
  let companyID: string
  // grab companyID from url params
  if (params?.id) {
    companyID = params.id as string
    // retrieve ticker by companyID
    const t = await getCompanyTicker({ prisma: prisma, input: companyID })

    // set props for component
    // some companyIDs are valid but do not have a valid ticker, their return value if it exists in DB is NO_TICKER_FOUND
    // for invalid companyIDs, getCompanyTicker will return 'Invalid CompanyID: No Ticker Found'
    return {
      props: {
        ticker: t,
      },
    }
  } else {
    // for invalid companyIDs that are not in DB, add this context to the ticker value
    return {
      props: {
        ticker: 'Invalid Company ID: NO_TICKER_FOUND',
      },
    }
  }
  //   const query = 'TSLA'
  //   const options = { period1: '2021-02-91' }
  //   const res: HistoricalResult = (await yahooFinance.historical(
  //     query,
  //     options,
  //   )) as HistoricalResult
  //   console.log(res)
  // const ret: HistoricalResult = await yahooFinance.historical(query, options) as HistoricalResult
  // return ret
}

export const CompanyDetails: FC<CompanyDetailsProps> = ({ ticker }) => {
  return (
    <>
      <div>
        <p>{ticker}</p>
      </div>
    </>
  )
}

export default CompanyDetails
