import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { Dataset } from '@prisma/client'
import type { Company } from '@prisma/client'

import { AdminNavBar } from '../../../components'
import { DynamicPaginatedAdminTable } from '../../../components/Table/DynamicPaginatedAdminTable'
import { INDUSTRIES } from '../../../utils/constants'
import { api } from '../../../utils/api'
import type { Column } from '../../../components/Table/DynamicTable/DynamicTable'

const industryKeyValue = INDUSTRIES.map((industry) => ({
  key: industry,
  value: industry,
}))

interface CompanyWithChangedEntries extends Company {
  changedEntries: (keyof Company)[]
}

const CompanyColumns: Column<Company>[] = [
  {
    key: 'name',
    label: 'Name',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row: Company) => row.name ?? '',
    },
  },
  {
    key: 'ticker',
    label: 'Ticker',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.ticker ?? '',
    },
  },
  {
    key: 'sector',
    label: 'Sector',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.sector ?? '',
    },
  },
  {
    key: 'industry',
    label: 'Industry',
    isEditable: true,
    ctrl: {
      type: 'select',
      options: industryKeyValue,
      render: (row) => row.industry ?? '',
    },
  },
  {
    key: 'description',
    label: 'Description',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.description ?? '',
    },
  },
  {
    key: 'netAssetVal',
    label: 'Net Asset Value',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.netAssetVal,
    },
  },
  {
    key: 'bloombergId',
    label: 'Bloomberg ID',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.bloombergId ?? '',
    },
  },
]

const UpdateData: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const [dataset, setDataSet] = useState<Dataset>('COMPANY')
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState<CompanyWithChangedEntries[]>([])
  const [skip, setSkip] = useState(0)

  const { data: investment } = api.investment.getInvestmentsBySkipTake.useQuery(
    {
      skip: skip,
      take: 20,
    },
  )
  const { data: company } = api.company.getCompaniesBySkipTake.useQuery({
    skip: skip,
    take: 20,
  })

  console.log(investment)

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const originalRows: Company[] = useMemo(
    () => company?.items ?? [],
    [company?.items],
  )

  // // Add data to table when data is loaded
  useEffect(() => {
    const cleanedRows = originalRows.map((row) => {
      return {
        ...row,
        changedEntries: [],
      }
    })
    setRows(cleanedRows)
  }, [originalRows, setRows])

  return (
    session && (
      <div>
        <AdminNavBar />
        <button onClick={() => setDataSet('INVESTMENT')}>Investments</button>
        <button onClick={() => setDataSet('COMPANY')}>Companies</button>
        <DynamicPaginatedAdminTable
          originalRows={rows}
          skip={skip}
          setSkip={setSkip}
          dataset={dataset}
          columns={CompanyColumns}
        />
      </div>
    )
  )
}

export default UpdateData
