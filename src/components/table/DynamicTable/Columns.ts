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
          options: getEnumKeyValue(Object.values(sectorEnum)),
          render: (row) => (row.sector ? sectorEnum[row.sector] : ''),
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
      // {
      //   key: 'maturityDate',
      //   label: 'Maturity Date',
      //   isEditable: isEditable,
      //   ctrl: {
      //     type: 'text',
      //     render: (row) => row.maturityDate?.toISOString() ?? '',
      //     applyStyle: (row: Investment) => (row.maturityDate?.toISOString() ? '' : errorStyle),
      //   },
      // },
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
  return []
}

export const FuelColumns: Column<Fuel>[] = [
  {
    key: 'year',
    label: 'Year',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.year,
      applyStyle: (row: Fuel) => (row.year ? '' : errorStyle),
    },
  },
  {
    key: 'totalConsumption',
    label: 'Total Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalConsumption ?? 0,
      applyStyle: (row: Fuel) => (row.totalConsumption ? '' : errorStyle),
    },
  },
  {
    key: 'biodiesels',
    label: 'Biodiesels',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.biodiesels ?? 0,
      applyStyle: (row: Fuel) => (row.biodiesels ? '' : errorStyle),
    },
  },
  {
    key: 'biogases',
    label: 'Biogases',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.biogases ?? 0,
      applyStyle: (row: Fuel) => (row.biogases ? '' : errorStyle),
    },
  },
  {
    key: 'crudeOil',
    label: 'Crude Oil',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.crudeOil ?? 0,
      applyStyle: (row: Fuel) => (row.crudeOil ? '' : errorStyle),
    },
  },
  {
    key: 'coal',
    label: 'Coal',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.coal ?? 0,
      applyStyle: (row: Fuel) => (row.coal ? '' : errorStyle),
    },
  },
  {
    key: 'oil',
    label: 'Oil',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.oil ?? 0,
      applyStyle: (row: Fuel) => (row.oil ? '' : errorStyle),
    },
  },
  {
    key: 'gas',
    label: 'Gas',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.gas ?? 0,
      applyStyle: (row: Fuel) => (row.gas ? '' : errorStyle),
    },
  },
  {
    key: 'otherBiomass',
    label: 'Other Biomass',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.otherBiomass ?? 0,
      applyStyle: (row: Fuel) => (row.otherBiomass ? '' : errorStyle),
    },
  },
  {
    key: 'sustainableBiomass',
    label: 'Sustainable Biomass',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.sustainableBiomass ?? 0,
      applyStyle: (row: Fuel) => (row.sustainableBiomass ? '' : errorStyle),
    },
  },
  {
    key: 'otherRenewable',
    label: 'Other Renewable',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.otherRenewable ?? 0,
      applyStyle: (row: Fuel) => (row.otherRenewable ? '' : errorStyle),
    },
  },
  {
    key: 'otherNonRenewable',
    label: 'Other Non-Renewable',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.otherNonRenewable ?? 0,
      applyStyle: (row: Fuel) => (row.otherNonRenewable ? '' : errorStyle),
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
      applyStyle: (row: Emission) => (row.date ? '' : errorStyle),
    },
  },
  {
    key: 'version',
    label: 'Version',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.version ?? 0,
      applyStyle: (row: Emission) => (row.version ? '' : errorStyle),
    },
  },
  {
    key: 'scopeOne',
    label: 'Scope One',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.scopeOne ?? 0,
      applyStyle: (row: Emission) => (row.scopeOne ? '' : errorStyle),
    },
  },
  {
    key: 'scopeTwo',
    label: 'Scope Two',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.scopeTwo ?? 0,
      applyStyle: (row: Emission) => (row.scopeTwo ? '' : errorStyle),
    },
  },
  {
    key: 'scopeThree',
    label: 'Scope Three',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.scopeThree ?? 0,
      applyStyle: (row: Emission) => (row.scopeThree ? '' : errorStyle),
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
      applyStyle: (row: Energy) => (row.year ? '' : errorStyle),
    },
  },
  {
    key: 'totalConsumption',
    label: 'Total Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalConsumption ?? 0,
      applyStyle: (row: Energy) => (row.totalConsumption ? '' : errorStyle),
    },
  },
  {
    key: 'totalRenewableConsumption',
    label: 'Total Renewable Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalRenewableConsumption ?? 0,
      applyStyle: (row: Energy) =>
        row.totalRenewableConsumption ? '' : errorStyle,
    },
  },
  {
    key: 'totalNonRenewableConsumption',
    label: 'Total Non-Renewable Consumption',
    isEditable: true,
    ctrl: {
      type: 'text',
      render: (row) => row.totalNonRenewableConsumption ?? 0,
      applyStyle: (row: Energy) =>
        row.totalNonRenewableConsumption ? '' : errorStyle,
    },
  },
]
