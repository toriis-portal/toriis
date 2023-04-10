import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { Company } from '@prisma/client'

import FinanceBrushChart from '../../components/Charts/FinanceBrushChart'
import {
  HighlightedTitle,
  InvestmentTable,
  ToolTip,
  Tag,
  EnergyRadialChart,
  BackButton,
} from '../../components'
import { api } from '../../utils/api'
import type { IndustryEntry, SectorEntry } from '../../types'

const tagGroupStyle = clsx('flex-col lg:inline-flex lg:flex-row')
const noteStyle = clsx('lg:px-2 font-medium truncate')
const tagStyle = clsx('bg-cobalt text-white')

const Company = () => {
  const companyId = (useRouter().query.id as string) ?? ''
  type CompanyData = [Company, SectorEntry, IndustryEntry]

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
        <HighlightedTitle
          title={data[0]?.name ?? 'Not Found'}
          size="large"
          color="clementine"
        />
      </div>
      <div className="mb-6 flex flex-row items-center justify-between xl:px-20">
        <div className={tagGroupStyle}>
          <Tag title="sector" className={tagStyle} />
          <div className={noteStyle}>{data[1]?.name ?? 'Not Found'}</div>
          <ToolTip
            title={data[1]?.name ?? 'Not Found'}
            details={data[1]?.details ?? 'Not Found'}
          />
          ,
        </div>
        <div className={tagGroupStyle}>
          <Tag title="industry" className={tagStyle} />
          <div className={noteStyle}>{data[2]?.name ?? 'Not Found'}</div>

          <ToolTip
            title={data[2]?.name ?? 'Not Found'}
            details={data[2]?.details ?? 'Not Found'}
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

      {!!companyId && data[0]?.ticker && (
        <>
          <Tag
            title="Yahoo Finance"
            className="w-4 rounded-md bg-clementine text-white"
          />
          <FinanceBrushChart companyId={companyId} />
        </>
      )}

      {data[0]?.energy && (
        <div className="flex flex-row">
          <EnergyRadialChart energyData={data[0]?.energy} />
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
