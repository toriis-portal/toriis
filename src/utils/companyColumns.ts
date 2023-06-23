import type {
  Company,
  Emission,
  Energy,
  Fuel,
  Investment,
} from '@prisma/client'

import type { Column } from '../components/table/DynamicTable/DynamicTable'

import { IndustryEnum, sectorEnum } from './enums'

const getEnumKeyValue = (enumType: string[]) => {
  return enumType.map((value) => ({
    key: value,
    value,
  }))
}

export const CompanyColumns: Column<Company>[] = [
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

export const InvestmentColumns: Column<Investment>[] = [
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

export const FuelColumns: Column<Fuel>[] = [
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

export const EmissionColumns: Column<Emission>[] = [
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

export const EnergyColumns: Column<Energy>[] = [
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
