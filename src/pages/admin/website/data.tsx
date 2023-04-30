import assert from 'assert'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type {
  Dataset,
  Emission,
  Energy,
  Fuel,
  Investment,
} from '@prisma/client'
import type { Company } from '@prisma/client'

import { AdminNavBar, TabButton } from '../../../components'
import { DynamicPaginatedAdminTable } from '../../../components/Table/DynamicPaginatedAdminTable'
import { api } from '../../../utils/api'
import type { Column } from '../../../components/Table/DynamicTable/DynamicTable'
import {
  getColumns,
  FuelColumns,
  EmissionColumns,
  EnergyColumns,
} from '../../../components/Table/DynamicTable/Columns'

interface baseChangedEntries {
  id: string
  changedEntries: (keyof (Company | Investment))[]
}

type DataSetTypes = Company | Investment | Fuel | Emission | Energy
type DataSetColumns = Column<DataSetTypes>[]
type UpdateTypesWithChangedEntries = DataSetTypes & baseChangedEntries

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
  const [skip, setSkip] = useState(0)

  const { data: investment } = api.investment.getInvestmentsBySkipTake.useQuery(
    {
      skip: skip,
      take: BATCH_SIZE,
    },
  )
  const { data: company } = api.company.getCompaniesBySkipTake.useQuery({
    skip: skip,
    take: BATCH_SIZE,
  })

  const { data: fuel } = api.fuel.getFuelsBySkipTake.useQuery({
    skip: skip,
    take: BATCH_SIZE,
  })

  const { data: emission } = api.emission.getEmissionsBySkipTake.useQuery({
    skip: skip,
    take: BATCH_SIZE,
  })

  const { data: energy } = api.energy.getEnergyBySkipTake.useQuery({
    skip: skip,
    take: BATCH_SIZE,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  useEffect(() => {
    if (dataset === 'COMPANY') {
      const companyData = company?.items ?? []
      setData(
        companyData.map((company) => {
          return {
            ...company,
            changedEntries: [],
          }
        }),
      )
      setColumns(getColumns('COMPANY', true) as DataSetColumns)
    } else if (dataset === 'INVESTMENT') {
      const investmentData = investment?.items ?? []
      setData(
        investmentData.map((investment: Investment) => ({
          ...investment,
          changedEntries: [],
        })),
      )
      setColumns(getColumns('INVESTMENT', true) as DataSetColumns)
    } else if (dataset === 'FUEL') {
      const fuelData = fuel?.items ?? []
      setData(
        fuelData.map((fuel) => ({
          ...fuel,
          changedEntries: [],
        })),
      )
      setColumns(FuelColumns as DataSetColumns)
    } else if (dataset === 'EMISSION') {
      const emissionData = emission?.items ?? []
      setData(
        emissionData.map((emission) => ({
          ...emission,
          changedEntries: [],
        })),
      )
      setColumns(EmissionColumns as DataSetColumns)
    } else if (dataset === 'ENERGY') {
      const energyData = energy?.items ?? []
      setData(
        energyData.map((energy) => ({
          ...energy,
          changedEntries: [],
        })),
      )
      setColumns(EnergyColumns as DataSetColumns)
    }
  }, [
    company,
    dataset,
    emission?.items,
    energy?.items,
    fuel?.items,
    investment,
  ])

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
          />
        </div>
      </div>
    )
  )
}

export default UpdateData
