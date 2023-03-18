import type { Investment } from '@prisma/client'

import { PrimaryButton } from '../../components'
import InvestmentTable from '../../components/Table/InvestmentTable'

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

const Home = () => {
  return (
    <>
      <InvestmentTable investments={TEST_INVESTMENTS} />
      <button>Load more</button>
    </>
  )
}

export default Home
