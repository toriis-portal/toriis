import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import { Company } from '@prisma/client'
import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useState } from 'react'

import { FuelEnum } from '../../utils/enums'
import { ContentWrapper } from '../../utils/content'
import { api } from '../../utils/api'
import {
  HighlightedTitle,
  InvestmentTable,
  EmissionBarChart,
  ReadMoreAccordion,
  EnergyRadialChart,
  FinanceBrushChart,
  BackButton,
  FuelRadialChart,
  ChartDetailsCard,
} from '../../components'
import { CompanyTooltipGroup, ChartGroup } from '../../sections'
import type { CompanyDetailsEntry } from '../../types'
import { mainParagraphStyle } from '../../utils/renderer'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const companyDetails: CompanyDetailsEntry[] = await contentClient.get(
    'companyDetailsPage',
  )
  const names = [
    'Yahoo Finance',
    'Carbon Accounting',
    'Renewable Energy',
    'ESG Explanation',
    ...Object.values(FuelEnum),
  ]
  const detailsMap: { [name: string]: CompanyDetailsEntry | null } = {}
  names.forEach((name) => {
    detailsMap[name] = companyDetails.find((item) => item.name == name) || null
  })

  return {
    props: {
      yahooFinanceDetails: detailsMap['Yahoo Finance'],
      carbonAccountingDetails: detailsMap['Carbon Accounting'],
      renewableEnergyDetails: detailsMap['Renewable Energy'],
      esgExplanation: detailsMap['Renewable Energy'],
      fuelDetails: Object.values(FuelEnum).map(
        (fuelName) => detailsMap[fuelName],
      ),
    },
  }
}

interface CompanyDetailsProps {
  yahooFinanceDetails: CompanyDetailsEntry
  carbonAccountingDetails: CompanyDetailsEntry
  renewableEnergyDetails: CompanyDetailsEntry
  esgExplanation: CompanyDetailsEntry
  fuelDetails: CompanyDetailsEntry[]
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
  yahooFinanceDetails,
  carbonAccountingDetails,
  renewableEnergyDetails,
  esgExplanation,
  fuelDetails,
}) => {
  const [labels, setLabels] = useState<string[]>([])
  const companyId = useRouter().query.id as string

  const { data, isLoading, isError } = api.company.getCompany.useQuery(
    { id: companyId },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!companyId,
      staleTime: Infinity,
    },
  )

  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }

  if (isError || !data) {
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
      <div className="mb-20 flex flex-col flex-wrap px-12 lg:px-24">
        <div className="flex flex-col items-center ">
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
          esgExplanation={documentToReactComponents(
            esgExplanation.description,
            mainParagraphStyle,
          )}
          className="mb-10"
        />
        {company.description && (
          <ReadMoreAccordion content={company.description} className="mb-10" />
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
                <ChartDetailsCard>
                  {documentToReactComponents(
                    carbonAccountingDetails.description,
                    mainParagraphStyle,
                  )}
                </ChartDetailsCard>
              }
              chartOnLeft={chartDirections['emission']}
              chartSize="md"
            />
          )}
          {company.fuel && (
            <ChartGroup
              title="CDP-Fuel"
              chart={
                <FuelRadialChart source={company.fuel} setLabels={setLabels} />
              }
              interpretation={
                <ChartDetailsCard>
                  <div className="flex flex-col gap-4">
                    {labels.map((label, key) => {
                      const item = fuelDetails.find(
                        (item) => item && item.name == label,
                      )
                      if (item && item.description) {
                        return (
                          <div key={key}>
                            {documentToReactComponents(
                              item.description,
                              mainParagraphStyle,
                            )}
                          </div>
                        )
                      }
                    })}
                  </div>
                </ChartDetailsCard>
              }
              chartOnLeft={chartDirections['fuel']}
              chartSize="md"
            />
          )}
          {company.energy && (
            <ChartGroup
              title="CDP-Energy"
              chart={<EnergyRadialChart energyData={company.energy} />}
              interpretation={
                <ChartDetailsCard>
                  {documentToReactComponents(
                    renewableEnergyDetails.description,
                    mainParagraphStyle,
                  )}
                </ChartDetailsCard>
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
                <ChartDetailsCard>
                  {documentToReactComponents(
                    yahooFinanceDetails.description,
                    mainParagraphStyle,
                  )}
                </ChartDetailsCard>
              }
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
