import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'

import FinanceBrushChart from '../../components/Charts/FinanceBrushChart'
import {
  HighlightedTitle,
  InvestmentTable,
  EmissionBarChart,
  CompanyDetailsAccordion,
  EnergyRadialChart,
  BackButton,
  FuelRadialChart,
  DataCard,
} from '../../components'
import { api } from '../../utils/api'
import { CompanyTooltipGroup, ChartGroup } from '../../sections'

const Company = () => {
  const companyId = (useRouter().query.id as string) ?? ''

  const { data, isLoading, isError } = api.company.getCompany.useQuery(
    { id: companyId },
    { refetchOnWindowFocus: false, retry: false, enabled: !!companyId },
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }

  if (
    isError ||
    !data ||
    !data.industryEntry ||
    !data.sectorEntry ||
    !data.company
  ) {
    return (
      <div className="flex flex-col items-center p-12">
        <HighlightedTitle
          title="Company Not Found"
          size="large"
          color="clementine"
        />
      </div>
    )
  }

  const { company, sectorEntry, industryEntry } = data

  return (
    <>
      <div className="mt-6 ml-8">
        <BackButton />
      </div>
      <div className="mb-20 flex flex-col px-12 lg:px-24">
        <div className="flex flex-col items-center">
          <HighlightedTitle
            title={company.name}
            size="large"
            color="clementine"
          />
        </div>
        <CompanyTooltipGroup
          company={company}
          sectorEntry={sectorEntry}
          industryEntry={industryEntry}
        />
        {company.description && (
          <CompanyDetailsAccordion content={company.description} />
        )}
        <HighlightedTitle
          title="Investment Visualizations"
          size="medium"
          color="brightTeal"
        />
        <div className="mx-4">
          {company.emission && (
            <ChartGroup
              title="Carbon Accounting"
              chart={<EmissionBarChart emissionData={company.emission} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={true}
              chartSize="md"
            />
          )}
          {company.fuel && (
            <ChartGroup
              title="CDP-Fuel"
              chart={<FuelRadialChart source={company.fuel} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={false}
              chartSize="md"
            />
          )}
          {company.energy && (
            <ChartGroup
              title="CDP-Energy"
              chart={<EnergyRadialChart energyData={company.energy} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={true}
              chartSize="sm"
            />
          )}
          {company.ticker && (
            <ChartGroup
              title="Yahoo Finance"
              chart={<FinanceBrushChart companyId={companyId} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={false}
              chartSize="lg"
            />
          )}
        </div>

        <HighlightedTitle
          title="Investment Details"
          size="medium"
          color="brightTeal"
        />
        <div className="flex w-full flex-row items-center justify-center">
          <InvestmentTable companyId={companyId} />
        </div>
      </div>
    </>
  )
}

export default Company
