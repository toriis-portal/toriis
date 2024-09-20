import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import { Company } from '@prisma/client'
import type { FC } from 'react'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'

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
    'Carbon Accounting Citation',
    'Carbon Accounting Exxon Citation',
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
      carbonAccountingCitationDetails: detailsMap['Carbon Accounting Citation'],
      carbonAccountingExxonCitationDetails:
        detailsMap['Carbon Accounting Exxon Citation'],
      renewableEnergyDetails: detailsMap['Renewable Energy'],
      esgExplanation: detailsMap['ESG Explanation'],
      fuelDetails: Object.values(FuelEnum).map(
        (fuelName) => detailsMap[fuelName],
      ),
    },
  }
}

interface CompanyDetailsProps {
  yahooFinanceDetails: CompanyDetailsEntry
  carbonAccountingDetails: CompanyDetailsEntry
  carbonAccountingCitationDetails: CompanyDetailsEntry
  carbonAccountingExxonCitationDetails: CompanyDetailsEntry
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
  carbonAccountingCitationDetails,
  carbonAccountingExxonCitationDetails,
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
      <div className="flex flex-col items-center p-12">
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

  /* For all companies excluding Exxon, this function
   * 1. fetches Carbon Accounting info and general Carbon Accouting citation
   * 2. concatenates the rich text
   * 3. renders rich text formatting with styling
   */
  function renderCarbonAccountingContent() {
    const combinedContent = [
      ...(carbonAccountingDetails.description.content || []),
      ...(carbonAccountingCitationDetails.description.content || []),
    ]

    const renderedCombinedContent = documentToReactComponents(
      {
        nodeType: BLOCKS.DOCUMENT,
        content: combinedContent,
        data: {},
      },
      {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
        },
      },
    )

    return renderedCombinedContent
  }

  /* For company Exxon with unique citation, this function distinctly
   * fetches Carbon Accounting info and unique Exxon Carbon Accouting citation
   */
  function renderExxonCarbonAccountingContent() {
    const combinedContent = [
      ...(carbonAccountingDetails.description.content || []),
      ...(carbonAccountingExxonCitationDetails.description.content || []),
    ]

    const renderedCombinedContent = documentToReactComponents(
      {
        nodeType: BLOCKS.DOCUMENT,
        content: combinedContent,
        data: {},
      },
      {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
        },
      },
    )

    return renderedCombinedContent
  }

  return (
    <>
      <div className="ml-8 mt-6">
        <BackButton link="/investments" />
      </div>
      <div className="mb-20 flex flex-col flex-wrap px-8 md:px-12 lg:px-24">
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
        <div className="mb-4 max-w-full md:mx-4">
          {company.emission && (
            <ChartGroup
              title="Carbon Accounting"
              chart={<EmissionBarChart emissionData={company.emission} />}
              interpretation={
                <ChartDetailsCard>
                  {companyId == '64a7f565a71c4cecb911ecb0'
                    ? renderExxonCarbonAccountingContent()
                    : renderCarbonAccountingContent()}
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
                  {/* <ReadMoreAccordion content={renewableEnergyDetails.description} /> */}
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

        {/* Only show Investment Table on non-mobile view. On mobile, show short message instead */}
        <div className="block font-normal italic md:hidden">
          Please use a device with a larger screen to view details on individual
          investments.
        </div>
        <div className="hidden md:block">
          <HighlightedTitle
            title="Investment Details"
            size="medium"
            color="brightTeal"
          />
          <div className="flex w-full flex-row items-center justify-center">
            <InvestmentTable companyId={companyId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Company
