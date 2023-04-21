import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import { Company } from '@prisma/client'
import type { FC } from 'react'
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

import { ContentWrapper } from '../../utils/content'
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

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const companyDetails: CompanyDetailsEntry[] = await contentClient.get(
    'companyDetailsPage',
  )
  const yahooFinance = companyDetails.find(
    (item) => 'name' in item && item.name == 'YahooFinance',
  )
  const carbonAccounting = companyDetails.find(
    (item) => 'name' in item && item.name == 'CarbonAccounting',
  )
  const renewableEnergy = companyDetails.find(
    (item) => 'name' in item && item.name == 'RenewableEnergy',
  )
  const fuelDetails: (CompanyDetailsEntry | undefined)[] = []
  const fuelTypes = [
    'Biodiesel',
    'Biogas',
    'CrudeOil',
    'Coal',
    'Oil',
    'Gas',
    'Biomass',
    'SustainableBiomass',
  ]

  fuelTypes.map((fuelName) => {
    fuelDetails.push(
      companyDetails.find((item) => 'name' in item && item.name == fuelName),
    )
  })

  console.log(fuelDetails)

  return {
    props: {
      yahooFinance: yahooFinance,
      carbonAccounting: carbonAccounting,
      renewableEnergy: renewableEnergy,
      fuelDetails: fuelDetails,
    },
  }
}

interface CompanyDetailsProps {
  yahooFinance: CompanyDetailsEntry
  carbonAccounting: CompanyDetailsEntry
  renewableEnergy: CompanyDetailsEntry
  fuelDetails: (CompanyDetailsEntry | undefined)[]
}

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

const Company: FC<CompanyDetailsProps> = ({
  yahooFinance,
  carbonAccounting,
  renewableEnergy,
  fuelDetails,
}) => {
  const contentfulOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <span className="font-semibold underline decoration-2 underline-offset-4">
          {text}
        </span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="align-center">{children}</p>
      ),
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        return (
          <a
            href={node.data.uri as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
            <ArrowUpRightIcon className="align-self-start ml-0.5 inline h-4 w-4 stroke-current stroke-1" />
          </a>
        )
      },
    },
  }
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

  function grabFuelData() {
    let fuelData = ' '
    fuelDetails.map((fuelItem) => {
      company.fuel &&
        company.fuel.map((item) => {
          if (item === fuelItem?.name) {
            fuelData += fuelItem?.description
          }
        })
    })
    return fuelData
  }
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
              interpretation={
                <DataCard>
                  {documentToReactComponents(
                    carbonAccounting.description,
                    contentfulOptions,
                  )}
                </DataCard>
              }
              chartOnLeft={chartDirections['emission']}
              chartSize="md"
            />
          )}
          {company.fuel && (
            <ChartGroup
              title="CDP-Fuel"
              chart={<FuelRadialChart source={company.fuel} />}
              interpretation={<DataCard>{grabFuelData()}</DataCard>}
              chartOnLeft={chartDirections['fuel']}
              chartSize="md"
            />
          )}
          {company.energy && (
            <ChartGroup
              title="CDP-Energy"
              chart={<EnergyRadialChart energyData={company.energy} />}
              interpretation={
                <DataCard>
                  {documentToReactComponents(
                    renewableEnergy.description,
                    contentfulOptions,
                  )}
                </DataCard>
              }
              chartOnLeft={chartDirections['energy']}
              chartSize="sm"
            />
          )}
          {company.ticker && (
            <ChartGroup
              title="Yahoo Finance"
              chart={<FinanceBrushChart companyId={companyId} />}
              interpretation={
                <DataCard>
                  {documentToReactComponents(
                    yahooFinance.description,
                    contentfulOptions,
                  )}
                </DataCard>
              }
              chartOnLeft={chartDirections['ticker']}
              chartSize="mm"
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
