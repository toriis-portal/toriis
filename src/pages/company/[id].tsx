import type { Investment } from '@prisma/client'
import clsx from 'clsx'
import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'

import { HighlightedTitle, InvestmentTable } from '../../components'
import { api } from '../../utils/api'
import ToolTip from '../../components/Tooltips/ToolTip'

const TEST_INVESTMENTS: Investment[] = [
  {
    id: '1',
    companyId: 'Test Company 1',
    rawName: 'Test Investment 1',
    coupon: 0.1,
    maturityDate: new Date('2021-01-01'),
    quantity: 200,
    costVal: 1000,
    marketVal: 2000,
    year: 2021,
  },
  {
    id: '2',
    companyId: 'Test Company 2',
    rawName: 'Test Investment 2',
    coupon: 0.2,
    maturityDate: new Date('2021-01-02'),
    quantity: 300,
    costVal: 2000,
    marketVal: 4000,
    year: 2023,
  },
  {
    id: '3',
    companyId: 'Test Company 3',
    rawName: 'Test Investment 3',
    coupon: 0.3,
    maturityDate: new Date('2021-01-03'),
    quantity: 100,
    costVal: 3000,
    marketVal: 6000,
    year: 2022,
  },
]

const Company = () => {
  const companyId = (useRouter().query.id as string) ?? ''

  const { data, isLoading, isError } = api.company.getCompany.useQuery(
    { id: companyId },
    { refetchOnWindowFocus: false, enabled: !!companyId },
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center px-12">
        <HighlightedTitle
          title="Company Not Found"
          size="large"
          color="clementine"
        />
      </div>
    )
  }

  return (
    <div className="mb-20 flex flex-col px-12">
      <div className="flex flex-col items-center">
        <HighlightedTitle title={data.name} size="large" color="clementine" />
      </div>
      <HighlightedTitle
        title="Investment Visualizations"
        size="medium"
        color="brightTeal"
      />
      <HighlightedTitle
        title="Investment Details"
        size="medium"
        color="brightTeal"
      />
      <div className="grid grid-flow-col grid-cols-4 gap-4">
        <ToolTip
          title="Industrial Sector"
          details="The industrial sector includes companies involved directly in the production of capital goods such as electrical or industrial machinery, or in the provision of transportation services and infrastructure."
        />
        <ToolTip
          title="Bank Diversity Industry"
          details="A subset of sector, still looking for good info for each industry"
        />
        <ToolTip
          title="Net Asset Sum"
          details="Calculated as the sum market values for each corporate bond for <company_name> "
        />
        <ToolTip>
          <div>
            Average environmental grade for sector <b>Industrials</b>:
            <div
              className={clsx(
                'inline-block rounded-2xl bg-clementine',
                'pl-3 pr-3 text-center text-lg text-white',
              )}
            >
              CCC
            </div>
            <br />
            <br />
            Environmental grade: ESG refers to a set of values used to screen
            potential investments: Environmental, Social and Governance. An ESG
            score measures how sustainably a company is conducting business
            based on their environmental impact calculated from their carbon
            emissions, energy consumption and climate change action. It also
            addresses 
          </div>
        </ToolTip>
      </div>
      <InvestmentTable investments={TEST_INVESTMENTS} />
      <button>Load more</button>
    </div>
  )
}

export default Company
