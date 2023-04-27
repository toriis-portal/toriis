import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Dataset } from '@prisma/client'

import { AdminNavBar } from '../../../components'
import { DynamicPaginatedAdminTable } from '../../../components/Table/DynamicPaginatedAdminTable'
import { api } from '../../../utils/api'

const UpdateData: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const [dataset, setDataSet] = useState<Dataset>('COMPANY')
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const { data, isLoading } = api.company.getCompaniesBySkipTake.useQuery({
    skip: 0,
    take: 20,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    session && (
      <div>
        <AdminNavBar />
        <button onClick={() => setDataSet('INVESTMENT')}>Investments</button>
        <button onClick={() => setDataSet('COMPANY')}>Companies</button>
        <DynamicPaginatedAdminTable
          dataset={dataset}
          originalRows={[]}
          columns={[]}
        />
      </div>
    )
  )
}

export default UpdateData
