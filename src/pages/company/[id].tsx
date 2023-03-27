import type { Investment } from '@prisma/client'
import clsx from 'clsx'

import InvestmentTable from '../../components/Table/InvestmentTable'
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
  return (
    <>
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
    </>
  )
}

export default Company
