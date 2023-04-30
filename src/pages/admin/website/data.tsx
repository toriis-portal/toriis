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
import { IndustryEnum, sectorEnum } from '../../../utils/enums'

interface baseChangedEntries {
  id: string
  changedEntries: (keyof (Company | Investment))[]
}

const getEnumKeyValue = (enumType: string[]) => {
  return enumType.map((value) => ({
    key: value,
    value,
  }))
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
  {
    key: 'maturityDate',
    label: 'Maturity Date',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.maturityDate.toISOString(),
    },
  },
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

const FuelColumns: Column<Fuel>[] = [
  {
    key: 'year',
    label: 'Year',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.year,
    },
  },
  {
    key: 'totalConsumption',
    label: 'Total Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalConsumption ?? 0,
    },
  },
  {
    key: 'biodiesels',
    label: 'Biodiesels',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.biodiesels ?? 0,
    },
  },
  {
    key: 'biogases',
    label: 'Biogases',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.biogases ?? 0,
    },
  },
  {
    key: 'crudeOil',
    label: 'Crude Oil',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.crudeOil ?? 0,
    },
  },
  {
    key: 'coal',
    label: 'Coal',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.coal ?? 0,
    },
  },
  {
    key: 'oil',
    label: 'Oil',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.oil ?? 0,
    },
  },
  {
    key: 'gas',
    label: 'Gas',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.gas ?? 0,
    },
  },
  {
    key: 'otherBiomass',
    label: 'Other Biomass',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.otherBiomass ?? 0,
    },
  },
  {
    key: 'sustainableBiomass',
    label: 'Sustainable Biomass',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.sustainableBiomass ?? 0,
    },
  },
  {
    key: 'otherRenewable',
    label: 'Other Renewable',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.otherRenewable ?? 0,
    },
  },
  {
    key: 'otherNonRenewable',
    label: 'Other Non-Renewable',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.otherNonRenewable ?? 0,
    },
  },
]

const EmissionColumns: Column<Emission>[] = [
  {
    key: 'date',
    label: 'Date',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row?.date?.toISOString() ?? '',
    },
  },
  {
    key: 'version',
    label: 'Version',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.version ?? 0,
    },
  },
  {
    key: 'scopeOne',
    label: 'Scope One',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.scopeOne ?? 0,
    },
  },
  {
    key: 'scopeTwo',
    label: 'Scope Two',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.scopeTwo ?? 0,
    },
  },
  {
    key: 'scopeThree',
    label: 'Scope Three',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.scopeThree ?? 0,
    },
  },
]

const EnergyColumns: Column<Energy>[] = [
  {
    key: 'year',
    label: 'Year',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.year ?? 0,
    },
  },
  {
    key: 'totalConsumption',
    label: 'Total Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalConsumption ?? 0,
    },
  },
  {
    key: 'totalRenewableConsumption',
    label: 'Total Renewable Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalRenewableConsumption ?? 0,
    },
  },
  {
    key: 'totalNonRenewableConsumption',
    label: 'Total Non-Renewable Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalNonRenewableConsumption ?? 0,
    },
  },
]

type DataSetTypes = Company | Investment | Fuel | Emission | Energy
type DataSetColumns = Column<DataSetTypes>[]
type UpdateTypesWithChangedEntries = DataSetTypes & baseChangedEntries

const UpdateData: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const [dataset, setDataSet] = useState<Dataset>('COMPANY')
  const [columns, setColumns] = useState<DataSetColumns>(
    CompanyColumns as DataSetColumns,
  )
  const [data, setData] = useState<UpdateTypesWithChangedEntries[]>([])
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

  const { data: fuel } = api.fuel.getFuelsBySkipTake.useQuery({
    skip: skip,
    take: 20,
  })

  const { data: emission } = api.emission.getEmissionsBySkipTake.useQuery({
    skip: skip,
    take: 20,
  })

  const { data: energy } = api.energy.getEnergyBySkipTake.useQuery({
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
      const companyData = company?.items ?? []
      setData(
        companyData.map((company) => {
          return {
            ...company,
            changedEntries: [],
          }
        }),
      )
      setColumns(CompanyColumns as DataSetColumns)
    } else if (dataset === 'INVESTMENT') {
      const investmentData = investment?.items ?? []
      setData(
        investmentData.map((investment: Investment) => ({
          ...investment,
          changedEntries: [],
        })),
      )
      setColumns(InvestmentColumns as DataSetColumns)
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
    )
  )
}

export default UpdateData
