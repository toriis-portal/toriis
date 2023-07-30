import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Dataset } from '@prisma/client'
import type {
  Company,
  Emission,
  Energy,
  Fuel,
  Investment,
} from '@prisma/client'

import {
  AdminNavBar,
  TabButton,
  DynamicPaginatedAdminTable,
} from '../../../components'
import { api } from '../../../utils/api'
import type { Column } from '../../../components/table/DynamicTable/DynamicTable'
import { getColumns } from '../../../components/table/DynamicTable/Columns'

type DataSetTypes = Company | Investment | Fuel | Emission | Energy
type DataSetColumns = Column<DataSetTypes>[]
type UpdateTypesWithChangedEntries = DataSetTypes & {
  changedEntries: (keyof DataSetTypes)[]
}

const UpdateData: FC = () => {
  const BATCH_SIZE = 10
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const [dataset, setDataSet] = useState<Dataset>('COMPANY')
  const [columns, setColumns] = useState<DataSetColumns>(
    getColumns('COMPANY', true) as DataSetColumns,
  )
  const [data, setData] = useState<UpdateTypesWithChangedEntries[]>([])
  const [rows, setRows] = useState<UpdateTypesWithChangedEntries[]>([])
  const [count, setCount] = useState(0)
  const [skip, setSkip] = useState(0)

  const { data: investment } = api.investment.getInvestmentsBySkipTake.useQuery(
    {
      skip: skip,
      take: BATCH_SIZE,
    },
    {
      retry: false,
      keepPreviousData: true,
      enabled: dataset === Dataset.INVESTMENT,
    },
  )
  const { data: company } = api.company.getCompaniesBySkipTake.useQuery(
    {
      skip: skip,
      take: BATCH_SIZE,
    },
    {
      retry: false,
      keepPreviousData: true,
      enabled: dataset === Dataset.COMPANY,
    },
  )
  const { data: fuel } = api.fuel.getFuelsBySkipTake.useQuery(
    {
      skip: skip,
      take: BATCH_SIZE,
    },
    { retry: false, keepPreviousData: true },
  )
  const { data: emission } = api.emission.getEmissionsBySkipTake.useQuery(
    {
      skip: skip,
      take: BATCH_SIZE,
    },
    {
      retry: false,
      keepPreviousData: true,
      enabled: dataset === Dataset.EMISSION,
    },
  )
  const { data: energy } = api.energy.getEnergyBySkipTake.useQuery(
    {
      skip: skip,
      take: BATCH_SIZE,
    },
    {
      retry: false,
      keepPreviousData: true,
      enabled: dataset === Dataset.ENERGY,
    },
  )

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  useEffect(() => {
    if (dataset === Dataset.COMPANY) {
      const companyData = company?.items ?? []
      setData(
        companyData.map((company) => {
          return {
            ...company,
            changedEntries: [],
          }
        }),
      )
      setCount(company?.count ?? 0)
      setColumns(getColumns(Dataset.COMPANY, true) as DataSetColumns)
    } else if (dataset === Dataset.INVESTMENT) {
      const investmentData = investment?.items ?? []
      setData(
        investmentData.map((investment: Investment) => ({
          ...investment,
          changedEntries: [],
        })),
      )
      setCount(investment?.count ?? 0)
      setColumns(getColumns(Dataset.INVESTMENT, true) as DataSetColumns)
    } else if (dataset === Dataset.FUEL) {
      const fuelData = fuel?.items ?? []
      setData(
        fuelData.map((fuel) => ({
          ...fuel,
          changedEntries: [],
        })),
      )
      setCount(fuel?.count ?? 0)
      setColumns(getColumns(Dataset.FUEL, true) as DataSetColumns)
    } else if (dataset === Dataset.EMISSION) {
      const emissionData = emission?.items ?? []
      setData(
        emissionData.map((emission) => ({
          ...emission,
          changedEntries: [],
        })),
      )
      setCount(emission?.count ?? 0)
      setColumns(getColumns(Dataset.EMISSION, true) as DataSetColumns)
    } else if (dataset === Dataset.ENERGY) {
      const energyData = energy?.items ?? []
      setData(
        energyData.map((energy) => ({
          ...energy,
          changedEntries: [],
        })),
      )
      setCount(energy?.count ?? 0)
      setColumns(getColumns(Dataset.ENERGY, true) as DataSetColumns)
    }
  }, [
    company,
    dataset,
    emission?.count,
    emission?.items,
    energy?.count,
    energy?.items,
    fuel?.count,
    fuel?.items,
    investment,
  ])

  // Add data to table when data is loaded
  useEffect(() => {
    const cleanedRows = data.map((row) => {
      return {
        ...row,
        changedEntries: [],
      }
    })
    setRows(cleanedRows)
  }, [data, setRows])

  useEffect(() => {
    setSkip(0)
  }, [dataset])

  return (
    session && (
      <div>
        <AdminNavBar />
        <div className="p-12">
          <div className="flex flex-row gap-4 pb-10">
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
            <TabButton
              active={dataset == 'FUEL'}
              text="Fuel"
              onClick={() => setDataSet('FUEL')}
            />
            <TabButton
              active={dataset == 'EMISSION'}
              text="Emission"
              onClick={() => setDataSet('EMISSION')}
            />
            <TabButton
              active={dataset == 'ENERGY'}
              text="Energy"
              onClick={() => setDataSet('ENERGY')}
            />
          </div>
          <DynamicPaginatedAdminTable
            originalRows={rows}
            skip={skip}
            setSkip={setSkip}
            dataset={dataset}
            columns={columns}
            rowCount={count}
          />
        </div>
      </div>
    )
  )
}

export default UpdateData
