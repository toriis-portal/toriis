import type { FC } from 'react'

import {
  PrimaryNavBar,
  ToTopButton,
  HighlightedTitle,
  SecondaryNavBar,
  ClimateClock,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FinancialCase, DirtyIndustries } from '../../sections'
import type { CaseEntry, DirtyCompanyEntry } from '../../types'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const caseEntries = await contentClient.get('case')
  const companyEntries = await contentClient.get('dirtyCompanies')
  return {
    props: {
      caseEntries,
      companyEntries: companyEntries,
    },
  }
}

interface FossilFuelProps {
  caseEntries: CaseEntry[]
  companyEntries: DirtyCompanyEntry[]
}

const FossilFuelPage: FC<FossilFuelProps> = ({
  caseEntries,
  companyEntries,
}) => {
  const navItems = [
    { path: 'uofiInvestments', text: 'University of Illinois Investments' },
    { path: 'dirtyIndustries', text: 'The Dirty Industry UIUC Supports' },
    { path: 'whyFossilFuelsAreBad', text: 'Why Are Fossil Fuels Bad' },
    { path: 'warning', text: 'What 1.5C Warning Means' },
    { path: 'financialCase', text: 'The Case For Institutional Divestments' },
    { path: 'divestedSchools', text: 'Schools That Have Divested ' },
    { path: 'divestedInstitutions', text: 'Institutions That Have Divested' },
  ]

  return (
    <>
      <PrimaryNavBar />
      <ToTopButton />
      <div className="flex justify-center">
        <HighlightedTitle
          title="Fossil Fuels"
          size="large"
          color="clementine"
        />
      </div>
      <SecondaryNavBar navItems={navItems} />

      {/* Placeholders for fossil fuel page sections: */}

      <div id="uofiInvestments" className="pt-20"></div>
      <div id="dirtyIndustries" className="pt-20">
        <DirtyIndustries companies={companyEntries} />
      </div>
      <div id="whyFossilFuelsAreBad" className="pt-20"></div>
      <div id="warning" className="pt-20"></div>

      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
      </div>

      {/* More placeholders for fossil fuel page sections: */}
      <div id="divestedSchools" className="pt-20"></div>
      <div id="divestedInstitutions" className="pt-20"></div>
      <ClimateClock />
    </>
  )
}

export default FossilFuelPage
