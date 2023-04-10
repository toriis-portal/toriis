import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import FinanceBrushChart from '../../components/Charts/FinanceBrushChart'
import {
  HighlightedTitle,
  InvestmentTable,
  ToolTip,
  Tag,
  EnergyRadialChart,
  BackButton,
  FuelRadialChart,
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

      <HighlightedTitle
        title="Investment Visualizations"
        size="medium"
        color="brightTeal"
      />
      <FuelRadialChart source={data?.fuel} />

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
