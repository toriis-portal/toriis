import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import { Company } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import { createClient } from 'contentful'

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
import type { CompanyDetailsEntry } from '../../types'

/**
 * Get the direction of the charts so that they alternate between left and right
 *
 * @param company the company to get the chart directions for
 * @returns a dictionary of chart names and if they should be on the left
 */
const getChartDirections = (company: Company) => {
  const charts = ['emission', 'fuel', 'energy', 'ticker']
  const directionDict: { [key: string]: boolean } = {}
  let count = 0
  for (const chart of charts) {
    if (company[chart as keyof Company]) {
      directionDict[chart] = count % 2 === 0
      count++
    }
  }
  return directionDict
}

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
  const chartDirections = getChartDirections(company)

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
          className="mb-10"
        />
        {company.description && (
          <CompanyDetailsAccordion
            content={company.description}
            className="mb-10"
          />
        )}
        {(company.emission ||
          company.fuel ||
          company.energy ||
          company.ticker) && (
          <HighlightedTitle
            title="Investment Visualizations"
            size="medium"
            color="brightTeal"
          />
        )}
        <div className="mx-4 mb-4">
          {company.emission && (
            <ChartGroup
              title="Carbon Accounting"
              chart={<EmissionBarChart emissionData={company.emission} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={chartDirections['emission']}
              chartSize="md"
            />
          )}
          {company.fuel && (
            <ChartGroup
              title="CDP-Fuel"
              chart={<FuelRadialChart source={company.fuel} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={chartDirections['fuel']}
              chartSize="md"
            />
          )}
          {company.energy && (
            <ChartGroup
              title="CDP-Energy"
              chart={<EnergyRadialChart energyData={company.energy} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={chartDirections['energy']}
              chartSize="sm"
            />
          )}
          {company.ticker && (
            <ChartGroup
              title="Yahoo Finance"
              chart={<FinanceBrushChart companyId={companyId} />}
              interpretation={<DataCard>Jooslin is your fav PM</DataCard>}
              chartOnLeft={chartDirections['ticker']}
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
