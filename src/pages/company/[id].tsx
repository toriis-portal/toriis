import type { Investment } from '@prisma/client'
import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'

import {
  HighlightedTitle,
  InvestmentTable,
  ToolTip,
  Tag,
} from '../../components'
import { api } from '../../utils/api'

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
    <div className="mb-20 flex flex-col p-12">
      <div className="flex flex-col items-center">
        <HighlightedTitle title={data.name} size="large" color="clementine" />
      </div>
      <div className="flex justify-center">
        <div className="inline-flex pr-10">
          <Tag title="sector" className="bg-cobalt text-white" />
          <div className="pr-2  pl-2 font-medium">industrials</div>

          <ToolTip
            title="Industrial Sector"
            details="The industrial sector includes companies involved directly in the production of capital goods such as electrical or industrial machinery, or in the provision of transportation services and infrastructure."
          />
        </div>
        <div className="inline-flex pr-10">
          <Tag title="industry" className="bg-cobalt text-white" />
          <div className="pr-2 pl-2 font-medium">bank diversity</div>

          <ToolTip
            title="Bank Diversity Industry"
            details="A subset of sector, still looking for good info for each industry"
          />
        </div>
        <div className="inline-flex pr-10">
          <Tag title="net asset sum" className="bg-cobalt text-white" />
          <div className="pr-2 pl-2 font-medium">500k</div>
          <ToolTip
            title="Net Asset Sum"
            details="Calculated as the sum market values for each corporate bond for <company_name> "
          />
        </div>
        <div className="inline-flex">
          <Tag title="environmental grade" className="bg-cobalt text-white" />
          <div className="pr-2 pl-2">
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
      <HighlightedTitle
        title="Investment Details"
        size="medium"
        color="brightTeal"
      />
      <InvestmentTable companyId={companyId} />
    </div>
  )
}

export default Company
