import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import FinanceBrushChart from '../../components/Charts/FinanceBrushChart'
import {
  HighlightedTitle,
  InvestmentTable,
  ToolTip,
  Tag,
  EmissionBarChart,
  CompanyDetailsAccordion,
  EnergyRadialChart,
  BackButton,
  FuelRadialChart,
  DataCard,
} from '../../components'
import { api } from '../../utils/api'

const tagGroupStyle = clsx('flex-col lg:inline-flex lg:flex-row')
const noteStyle = clsx('lg:px-2 font-medium truncate')
const tagStyle = clsx('bg-cobalt text-white')

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

  return (
    <div className="mb-20 mt-8 flex flex-col px-12 ">
      <BackButton />
      <div className="flex flex-col items-center">
        <HighlightedTitle title={data.name} size="large" color="clementine" />
      </div>
      <div className="mb-6 flex flex-row items-center justify-between xl:px-20">
        <div className={tagGroupStyle}>
          <Tag title="sector" className={tagStyle} />
          <div className={noteStyle}>industrials</div>

          <ToolTip
            title="Industrial Sector"
            details="The industrial sector includes companies involved directly in the production of capital goods such as electrical or industrial machinery, or in the provision of transportation services and infrastructure."
          />
        </div>
        <div className={tagGroupStyle}>
          <Tag title="industry" className={tagStyle} />
          <div className={noteStyle}>bank diversity</div>

          <ToolTip
            title="Bank Diversity Industry"
            details="A subset of sector, still looking for good info for each industry"
          />
        </div>
        <div className={tagGroupStyle}>
          <Tag title="net asset value" className={tagStyle} />
          <div className={noteStyle}>500k</div>
          <ToolTip
            title="Net Asset Value"
            details="Calculated as the sum market values for each corporate bond for <company_name> "
          />
        </div>
        <div className={tagGroupStyle}>
          <Tag title="environmental grade" className={tagStyle} />
          <div className={noteStyle}>
            <Tag title="AAA" className="bg-brightTeal text-white" />
          </div>
          <ToolTip>
            <div>
              Average environmental grade for sector <b>Industrials</b>:
              <Tag title="CCC" className="bg-clementine text-white" />
              <br />
              Environmental grade: ESG refers to a set of values used to screen
              potential investments: Environmental, Social and Governance. An
              ESG score measures how sustainably a company is conducting
              business based on their environmental impact calculated from their
              carbon emissions, energy consumption and climate change action. It
              also addresses
            </div>
          </ToolTip>
        </div>
      </div>
      {data.description && (
        <CompanyDetailsAccordion content={data.description} />
      )}
      <HighlightedTitle
        title="Investment Visualizations"
        size="medium"
        color="brightTeal"
      />
      <Tag
        title="CDP-Fuel"
        className="round-s ml-6 mb-5 bg-clementine text-white"
      />
      {data?.fuel && <FuelRadialChart source={data.fuel} />}
      {data.emission && (
        <div>
          <Tag
            title="Carbon Accounting"
            className="round-s ml-6 mb-5 bg-clementine text-white"
          />
          <div className="mb-4 flex items-center">
            <div className="w-1/2">
              <EmissionBarChart emissionData={data.emission} />
            </div>
            <div className="ml-20 w-1/2 ">
              <DataCard>
                <a
                  href="https://en.wikipedia.org/wiki/Carbon_accounting"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>
                    <u>Carbon accounting</u>
                  </b>
                </a>{' '}
                methods serve as a framework for organizations to measure how
                much carbon they emit. Standard carbon accounting frameworks
                divide emissions into three scopes.{' '}
                <a
                  href="https://www.epa.gov/climateleadership/scope-1-and-scope-2-inventory-guidance"
                  target="_blank"
                  rel="noreferrer"
                >
                  <u>Scope 1 and 2</u>
                </a>{' '}
                metrics quantify the greenhouse gas emissions caused by the
                operations of an organization. Scope 1 emissions are the direct
                greenhouse gas emissions that occur from the operations of
                organization units such as facilities and transportation.{' '}
                <a
                  href="https://www.epa.gov/climateleadership/scope-3-inventory-guidance"
                  target="_blank"
                  rel="noreferrer"
                >
                  <u>Scope 3</u>
                </a>{' '}
                metrics quantify the carbon footprint of an organization&#39;s
                products in the value chain. For example, the Scope 3 emissions
                of an organization that owns a natural gas pipeline includes the
                emission caused by the burning of the gas that is transported
                and sold by said organization. The{' '}
                <a href="https://www.wri.org/" target="_blank" rel="noreferrer">
                  <u>World Resource Institute</u>
                </a>{' '}
                and{' '}
                <a
                  href="https://www.wbcsd.org/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <u>WBCSD</u>
                </a>{' '}
                provide the{' '}
                <a
                  href="https://ghgprotocol.org/sites/default/files/standards/Corporate-Value-Chain-Accounting-Reporing-Standard_041613_2.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <u>standard for scope emissions reporting</u>
                </a>
                .
                <br />
                <br />
                The Scope 1, 2 and 3 emissions presented are sources from
                Bloomberg Finance L.P. via the University of Illinois-Urbana
                Champaign Licence, 2023. Bloomberg Finance relies on
                self-reported scope emission data when available, and uses
                robust{' '}
                <a
                  href="https://bloomberg.com/professional/blog/bloombergs-greenhouse-gas-emissions-estimates-model-a-summary-of-challenges-and-modeling-solutions/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <u>machine learning models</u>
                </a>{' '}
                to estimate scope emissions when an organization does not
                provide emissions data.
                <br />
                <br />
                <br />
                source: <u>fjkdshfjaksdhfjashdfajkdhfajdhfjk</u>
              </DataCard>
            </div>
          </div>
        </div>
      )}
      {!!companyId && data.ticker && (
        <>
          <Tag
            title="Yahoo Finance"
            className="w-4 rounded-md bg-clementine text-white"
          />
          <FinanceBrushChart companyId={companyId} />
        </>
      )}

      {data.energy && (
        <div className="flex flex-row">
          <EnergyRadialChart energyData={data.energy} />
          <p>the text box will go here</p>
        </div>
      )}

      <HighlightedTitle
        title="Investment Details"
        size="medium"
        color="brightTeal"
      />
      <div className="flex w-full flex-row items-center justify-center">
        <InvestmentTable companyId={companyId} />
      </div>
    </div>
  )
}

export default Company
