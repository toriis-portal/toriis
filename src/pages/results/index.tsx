import { useEffect, useState } from 'react'
import type { FC } from 'react'

import { api } from '../../utils/api'

const Results: FC = () => {
  const limit = 5
  const companyId = '63ee97cc2c5ff254d2fcbed2'
  const source = api.company.getInvestmentByCompany.useInfiniteQuery(
    {
      limit: limit,
      companyId: companyId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    },
  )
  console.log(source.data)
  return (
    <>
      <div> Hello</div>
    </>
  )
}

export default Results
