import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { Dataset, Investment } from '@prisma/client'
import type { Company } from '@prisma/client'

import { AdminNavBar, TabButton } from '../../../components'
import { DynamicPaginatedAdminTable } from '../../../components/Table/DynamicPaginatedAdminTable'
import { api } from '../../../utils/api'
import type { Column } from '../../../components/Table/DynamicTable/DynamicTable'
import { IndustryEnum, sectorEnum } from '../../../utils/enums'
import type { UpdateType } from '../../../types'

const industryKeyValue = Object.values(IndustryEnum).map((industry) => ({
  key: industry,
  value: industry,
}))

const getEnumKeyValue = (enumType: string[]) => {
  return enumType.map((value) => ({
    key: value,
    value,
  }))
}

interface baseChangedEntries {
  id: string
  changedEntries: (keyof (Company | Investment))[]
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
      type: 'select',
      options: getEnumKeyValue(Object.values(sectorEnum)),
      render: (row) => row.sector ?? '',
    },
  },
  {
    key: 'industry',
    label: 'Industry',
    isEditable: true,
    ctrl: {
      type: 'select',
      options: getEnumKeyValue(Object.values(IndustryEnum)),
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

const InvestmentColumns: Column<Investment>[] = [
  {
    key: 'rawName',
    label: 'Name',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.rawName ?? '',
    },
  },
  {
    key: 'coupon',
    label: 'Coupon',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.coupon,
    },
  },
  // {
  //   key: 'maturityDate',
  //   label: 'Maturity Date',
  //   isEditable: true,
  //   ctrl: {
  //     type: 'text',
  //     render: (row) => row.maturityDate,
  //   },
  // },
  {
    key: 'quantity',
    label: 'Quantity',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.quantity,
    },
  },
  {
    key: 'costVal',
    label: 'Cost Value',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.costVal,
    },
  },
  {
    key: 'marketVal',
    label: 'Market Value',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.marketVal,
    },
  },
  {
    key: 'year',
    label: 'Year',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.year,
    },
  },
]

type UpdateTypesWithChangedEntries = (Company | Investment) & baseChangedEntries

const UpdateData: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const [dataset, setDataSet] = useState<Dataset>('COMPANY')
  const [columns, setColumns] = useState<
    Column<Investment>[] | Column<Company>[]
  >(CompanyColumns)
  const [data, setData] = useState<(Investment | Company)[]>([])
  const [rows, setRows] = useState<UpdateTypesWithChangedEntries[]>([])
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

  useEffect(() => {
    if (dataset === 'COMPANY') {
      setData(company?.items ?? [])
      setColumns(CompanyColumns)
    } else {
      setData(investment?.items ?? [])
      setColumns(InvestmentColumns)
    }
  }, [company, dataset, investment])

  // // Add data to table when data is loaded
  useEffect(() => {
    const cleanedRows = data.map((row) => {
      return {
        ...row,
        changedEntries: [],
      }
    })
    setRows(cleanedRows)
  }, [data, setRows])

  return (
    session && (
      <div>
        <AdminNavBar />
        <div>
          <TabButton
            active={dataset == 'INVESTMENT'}
            text="Investment"
            onClick={() => setDataSet('INVESTMENT')}
          />
          <TabButton
            active={dataset == 'COMPANY'}
            text="Company"
            onClick={() => setDataSet('COMPANY')}
          />
        </div>
        <DynamicPaginatedAdminTable
          originalRows={rows}
          skip={skip}
          setSkip={setSkip}
          dataset={dataset}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          columns={columns}
        />
      </div>
    )
  )
}

export default UpdateData
