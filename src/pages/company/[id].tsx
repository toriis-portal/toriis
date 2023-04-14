import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import { INLINES } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'

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
import type { CompanyData } from '../../types'
import { envGradeToColor } from '../../utils/helpers'
import { assetAmountToString } from '../../utils/helpers'

const tagGroupStyle = clsx('flex-col lg:inline-flex lg:flex-row')
const noteStyle = clsx('lg:px-2 font-medium truncate')
const tagStyle = clsx('bg-cobalt text-white')

const Company = () => {
  const companyId = (useRouter().query.id as string) ?? ''

  const { data, isLoading, isError } =
    api.company.getCompany.useQuery<CompanyData>(
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

  const contentfulOptions = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
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

  const { company, sectorEntry, industryEntry } = data

  return (
    <>
      <div className="mb-20 mt-8 flex flex-col px-12 ">
        <BackButton />
        <div className="flex flex-col items-center">
          <HighlightedTitle
            title={company.name}
            size="large"
            color="clementine"
          />
        </div>
        <div className="mb-6 flex flex-row items-center justify-between xl:px-20">
          <div className={tagGroupStyle}>
            <Tag title="sector" className={tagStyle} />
            <div className={noteStyle}>{sectorEntry.name}</div>
            <ToolTip
              title={sectorEntry.name}
              details={documentToReactComponents(
                sectorEntry.details,
                contentfulOptions,
              )}
            />
          </div>
          <div className={tagGroupStyle}>
            <Tag title="industry" className={tagStyle} />
            <div className={noteStyle}>{industryEntry.name}</div>

            <ToolTip
              title={industryEntry.name}
              details={industryEntry.details}
            />
          </div>
          <div className={tagGroupStyle}>
            <Tag title="net asset value" className={tagStyle} />
            <div className={noteStyle}>
              {assetAmountToString(company.netAssetVal)}
            </div>
            <ToolTip
              title="Net Asset Value"
              details={`Calculated as the sum market values for each corporate bond for ${company.name}`}
            />
          </div>
          <div className={tagGroupStyle}>
            <Tag title="environmental grade" className={tagStyle} />
            <div className={noteStyle}>
              <Tag
                title={company.ESG ? company.ESG?.environmentGrade : 'N/A'}
                className={`${envGradeToColor(
                  company.ESG ? company.ESG?.environmentGrade : 'N/A',
                )} text-white`}
              />
            </div>
            <ToolTip>
              <div>
                Average environmental grade for sector <b>Industrials</b>:
                <Tag title="CCC" className="bg-clementine text-white" />
                <br />
                Environmental grade: ESG refers to a set of values used to
                screen potential investments: Environmental, Social and
                Governance. An ESG score measures how sustainably a company is
                conducting business based on their environmental impact
                calculated from their carbon emissions, energy consumption and
                climate change action. It also addresses
              </div>
            </ToolTip>
          </div>
        </div>
        {company.description && (
          <CompanyDetailsAccordion content={company.description} />
        )}
        <HighlightedTitle
          title="Investment Visualizations"
          size="medium"
          color="brightTeal"
        />

        {!!companyId && company.ticker && (
          <>
            <Tag
              title="Yahoo Finance"
              className="w-4 rounded-md bg-clementine text-white"
            />
            <FinanceBrushChart companyId={companyId} />
          </>
        )}

        {company.energy && (
          <div className="flex flex-row">
            <EnergyRadialChart energyData={company.energy} />
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
      {company.description && (
        <CompanyDetailsAccordion content={company.description} />
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
      {company?.fuel && <FuelRadialChart source={company.fuel} />}
      {company.emission && (
        <div>
          <Tag
            title="Carbon Accounting"
            className="round-s ml-6 mb-5 bg-clementine text-white"
          />
          <div className="mb-4 flex items-center">
            <div className="w-1/2">
              <EmissionBarChart emissionData={company.emission} />
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
      {!!companyId && company.ticker && (
        <>
          <Tag
            title="Yahoo Finance"
            className="w-4 rounded-md bg-clementine text-white"
          />
          <FinanceBrushChart companyId={companyId} />
        </>
      )}

      {company.energy && (
        <div className="flex flex-row">
          <EnergyRadialChart energyData={company.energy} />
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
    </>
  )
}

export default Company
