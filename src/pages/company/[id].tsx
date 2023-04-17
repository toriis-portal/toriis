import { Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'

import FinanceBrushChart from '../../components/Charts/FinanceBrushChart'
import {
  HighlightedTitle,
  InvestmentTable,
  Tag,
  EmissionBarChart,
  CompanyDetailsAccordion,
  EnergyRadialChart,
  BackButton,
  FuelRadialChart,
  DataCard,
} from '../../components'
import { api } from '../../utils/api'
import CompanyTooltipGroup from '../../sections/company/TooltipGroup'

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
      <div className="mb-20 mt-8 flex flex-col px-12 ">
        <BackButton />
        <div className="flex flex-col items-center">
          <HighlightedTitle
            title={company.name}
            size="large"
            color="clementine"
          />
        </div>
        <CompanyTooltipGroup companyData={data} />
        {company.description && (
          <CompanyDetailsAccordion content={company.description} />
        )}
        <HighlightedTitle
          title="Investment Visualizations"
          size="medium"
          color="brightTeal"
        />

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
                <DataCard>Jooslin is your fav PM</DataCard>
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

        <Tag
          title="CDP-Fuel"
          className="round-s ml-6 mb-5 bg-clementine text-white"
        />
        {company?.fuel && <FuelRadialChart source={company.fuel} />}

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
