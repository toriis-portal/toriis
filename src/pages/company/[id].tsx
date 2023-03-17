import type { Investment } from '@prisma/client'

import InvestmentTable from '../../components/Table/InvestmentTable'

const TEST_INVESTMENTS: Investment[] = [
  {
    id: '1',
    companyId: 'Test Company 1',
    rawName: 'Test Investment 1',
    coupon: 0.1,
    maturityDate: new Date(),
    quantity: 100,
    costVal: 1000,
    marketVal: 2000,
    year: 2021,
  },
  {
    id: '2',
    companyId: 'Test Company 2',
    rawName: 'Test Investment 2',
    coupon: 0.2,
    maturityDate: new Date(),
    quantity: 200,
    costVal: 2000,
    marketVal: 4000,
    year: 2021,
  },
  {
    id: '3',
    companyId: 'Test Company 3',
    rawName: 'Test Investment 3',
    coupon: 0.3,
    maturityDate: new Date(),
    quantity: 300,
    costVal: 3000,
    marketVal: 6000,
    year: 2021,
  },
]

const Home = () => {
  return (
    <>
      <InvestmentTable investments={TEST_INVESTMENTS} />
    </>
  )
}

export default Home
