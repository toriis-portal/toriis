import type {
  Company,
  Investment,
  Emission,
  Fuel,
  Energy,
} from '@prisma/client'
import { Dataset } from '@prisma/client'

import type { Column } from '../../../components/table/DynamicTable/DynamicTable'
import { IndustryEnum, sectorEnum } from '../../../utils/enums'

const errorStyle = 'border-2 border-pumpkin'

const getEnumKeyValue = (enumType: string[]) => {
  return enumType.map((value) => ({
    key: value,
    value,
  }))
}

export const getColumns = (key: Dataset, isEditable: boolean) => {
  if (key == Dataset.COMPANY) {
    const CompanyColumns: Column<Company>[] = [
      {
        key: 'name',
        label: 'Name',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row: Company) => row.name ?? '',
          applyStyle: (row: Company) => (row.name ? '' : errorStyle),
        },
      },
      {
        key: 'ticker',
        label: 'Ticker',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row: Company) => row.ticker ?? '',
          applyStyle: (row: Company) => (row.ticker ? '' : errorStyle),
        },
      },
      {
        key: 'sector',
        label: 'Sector',
        isEditable: isEditable,
        ctrl: {
          type: 'select',
          options: getEnumKeyValue(Object.keys(sectorEnum)),
          render: (row) => (row.sector ? row.sector : ''),
          applyStyle: (row: Company) => (row.sector ? '' : errorStyle),
        },
      },
      {
        key: 'industry',
        label: 'Industry',
        isEditable: isEditable,
        ctrl: {
          type: 'select',
          options: getEnumKeyValue(Object.values(IndustryEnum)),
          render: (row) => row.industry ?? '',
          applyStyle: (row: Company) => (row.industry ? '' : errorStyle),
        },
      },
      {
        key: 'description',
        label: 'Description',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.description ?? '',
          applyStyle: (row: Company) => (row.description ? '' : errorStyle),
        },
      },
      {
        key: 'netAssetVal',
        label: 'Net Asset Value',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.netAssetVal,
          applyStyle: (row: Company) => (row.netAssetVal ? '' : errorStyle),
        },
      },
      {
        key: 'bloombergId',
        label: 'Bloomberg ID',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.bloombergId ?? '',
          applyStyle: (row: Company) => (row.bloombergId ? '' : errorStyle),
        },
      },
    ]
    return CompanyColumns
  }
  if (key == Dataset.INVESTMENT) {
    const InvestmentColumns: Column<Investment>[] = [
      {
        key: 'rawName',
        label: 'Name',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.rawName ?? '',
          applyStyle: (row: Investment) => (row.rawName ? '' : errorStyle),
        },
      },
      {
        key: 'coupon',
        label: 'Coupon',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.coupon,
          applyStyle: (row: Investment) => (row.coupon ? '' : errorStyle),
        },
      },
      {
        key: 'maturityDate',
        label: 'Maturity Date',
        isEditable: true,
        ctrl: {
          type: 'date',
          render: (row) => row?.maturityDate?.toISOString().split('T')[0] ?? '',
          applyStyle: (row: Investment) =>
            row.maturityDate?.toISOString() ? '' : errorStyle,
        },
      },
      {
        key: 'quantity',
        label: 'Quantity',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.quantity,
          applyStyle: (row: Investment) => (row.quantity ? '' : errorStyle),
        },
      },
      {
        key: 'costVal',
        label: 'Cost Value',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.costVal,
          applyStyle: (row: Investment) => (row.costVal ? '' : errorStyle),
        },
      },
      {
        key: 'marketVal',
        label: 'Market Value',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.marketVal,
          applyStyle: (row: Investment) => (row.marketVal ? '' : errorStyle),
        },
      },
      {
        key: 'year',
        label: 'Year',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.year,
          applyStyle: (row: Investment) => (row.year ? '' : errorStyle),
        },
      },
    ]
    return InvestmentColumns
  }
  if (key == Dataset.FUEL) {
    const FuelColumns: Column<Fuel>[] = [
      {
        key: 'year',
        label: 'Year',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.year,
        },
      },
      {
        key: 'totalConsumption',
        label: 'Total Consumption',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.totalConsumption ?? 0,
        },
      },
      {
        key: 'biodiesels',
        label: 'Biodiesels',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.biodiesels ?? 0,
        },
      },
      {
        key: 'biogases',
        label: 'Biogases',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.biogases ?? 0,
        },
      },
      {
        key: 'crudeOil',
        label: 'Crude Oil',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.crudeOil ?? 0,
        },
      },
      {
        key: 'coal',
        label: 'Coal',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.coal ?? 0,
        },
      },
      {
        key: 'oil',
        label: 'Oil',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.oil ?? 0,
        },
      },
      {
        key: 'gas',
        label: 'Gas',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.gas ?? 0,
        },
      },
      {
        key: 'otherBiomass',
        label: 'Other Biomass',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.otherBiomass ?? 0,
        },
      },
      {
        key: 'sustainableBiomass',
        label: 'Sustainable Biomass',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.sustainableBiomass ?? 0,
        },
      },
      {
        key: 'otherRenewable',
        label: 'Other Renewable',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.otherRenewable ?? 0,
        },
      },
      {
        key: 'otherNonRenewable',
        label: 'Other Non-Renewable',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.otherNonRenewable ?? 0,
        },
      },
    ]
    return FuelColumns
  }
  if (key == Dataset.EMISSION) {
    const EmissionColumns: Column<Emission>[] = [
      {
        key: 'date',
        label: 'Date',
        isEditable: true,
        ctrl: {
          type: 'date',
          render: (row) => row?.date?.toISOString().split('T')[0] ?? '',
        },
      },
      {
        key: 'version',
        label: 'Version',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.version ?? 0,
        },
      },
      {
        key: 'scopeOne',
        label: 'Scope One',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.scopeOne ?? 0,
        },
      },
      {
        key: 'scopeTwo',
        label: 'Scope Two',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.scopeTwo ?? 0,
        },
      },
      {
        key: 'scopeThree',
        label: 'Scope Three',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.scopeThree ?? 0,
        },
      },
    ]
    return EmissionColumns
  }
  if (key == Dataset.ENERGY) {
    const EnergyColumns: Column<Energy>[] = [
      {
        key: 'year',
        label: 'Year',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.year ?? 0,
        },
      },
      {
        key: 'totalConsumption',
        label: 'Total Consumption',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.totalConsumption ?? 0,
        },
      },
      {
        key: 'totalRenewableConsumption',
        label: 'Total Renewable Consumption',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.totalRenewableConsumption ?? 0,
        },
      },
      {
        key: 'totalNonRenewableConsumption',
        label: 'Total Non-Renewable Consumption',
        isEditable: isEditable,
        ctrl: {
          type: 'text',
          render: (row) => row.totalNonRenewableConsumption ?? 0,
        },
      },
    ]
    return EnergyColumns
  }
  return []
}
