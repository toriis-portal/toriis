import type { FC } from 'react'

import {
  PrimaryNavBar,
  ToTopButton,
  HighlightedTitle,
  SecondaryNavBar,
  Footer,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FossilFuelPage } from '../../types'
import type { CaseEntry, DirtyCompanyEntry, LinkEntry } from '../../types'
import {
  UniversityInvestments,
  DirtyIndustries,
  FossilFuelsBad,
  WhatWarmingMeans,
  SchoolsDivested,
  InstitutionsDivested,
  FinancialCase,
} from '../../sections'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()

  const fossilFuelEntries = await contentClient.getAllFossilFuelPageEntries()
  const caseEntries = fossilFuelEntries['case']
  const companyEntries = fossilFuelEntries['dirtyCompanies']
  const linkEntries = fossilFuelEntries['link']
  const fossilFuelPageEntries = fossilFuelEntries['fossilFuelPage']

  return {
    props: {
      linkEntries,
      caseEntries,
      companyEntries,
      fossilFuelPageEntries,
    },
  }
}

interface FossilFuelProps {
  linkEntries: LinkEntry[]
  caseEntries: CaseEntry[]
  companyEntries: DirtyCompanyEntry[]
  fossilFuelPageEntries: FossilFuelPage
}

const FossilFuelPage: FC<FossilFuelProps> = ({
  linkEntries,
  caseEntries,
  companyEntries,
  fossilFuelPageEntries,
}) => {
  const navItems = [
    { path: 'uofiInvestments', text: 'University of Illinois Investments' },
    { path: 'dirtyIndustries', text: 'The Dirty Industry UIUC Supports' },
    { path: 'whyFossilFuelsAreBad', text: 'Why Are Fossil Fuels Bad' },
    { path: 'warming', text: 'What 1.5C Warming Means' },
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

      <div id="uofiInvestments" className="pt-10">
        <UniversityInvestments
          img={fossilFuelPageEntries['treeMap']}
          caption={fossilFuelPageEntries['uofIInvestments']}
        />
      </div>
      <div id="dirtyIndustries" className="pt-20">
        <DirtyIndustries companies={companyEntries} />
      </div>
      <div id="whyFossilFuelsAreBad" className="pt-20">
        <FossilFuelsBad
          text={fossilFuelPageEntries['whyAreFossilFuelsBad']}
          caption={fossilFuelPageEntries['climateClock']}
        />
      </div>
      <div id="warming">
        <WhatWarmingMeans
          text={fossilFuelPageEntries['warmingMeans']}
          linkEntries={linkEntries}
          footnote={fossilFuelPageEntries['warmingSource']}
        />
      </div>
      <div id="financialCase" className="pt-20">
        <FinancialCase
          entries={caseEntries}
          text={fossilFuelPageEntries['divestmentCase']}
          img={fossilFuelPageEntries['divestmentGraph']}
          footnote={fossilFuelPageEntries['divestmentSource']}
        />
      </div>
      <div id="divestedSchools" className="pt-20">
        <SchoolsDivested
          schoolEntries={fossilFuelPageEntries['divestedSchools']}
        />
      </div>
      <div id="divestedInstitutions" className="pt-20">
        <InstitutionsDivested
          institutionEntries={fossilFuelPageEntries['divestedInstitutions']}
        />
      </div>
      <Footer />
    </>
  )
}

export default FossilFuelPage
