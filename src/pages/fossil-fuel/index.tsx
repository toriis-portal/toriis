import type { FC } from 'react'

import {
  PrimaryNavBar,
  ToTopButton,
  HighlightedTitle,
  SecondaryNavBar,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FossilFuelPage } from '../../types'
import type { CaseEntry } from '../../types'
import {
  UniversityInvestments,
  DirtyIndustry,
  FossilFuelsBad,
  WhatWarningMeans,
  SchoolsDivested,
  InstitutionsDivested,
  FinancialCase,
} from '../../sections'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const fossilFuelEntries = await contentClient.getAllFossilFuelPageEntries()
  const caseEntries = fossilFuelEntries['case']
  const fossilFuelPageEntries = fossilFuelEntries['fossilFuelPage']

  return {
    props: {
      caseEntries,
      fossilFuelPageEntries,
    },
  }
}

interface FossilFuelProps {
  caseEntries: CaseEntry[]
  fossilFuelPageEntries: FossilFuelPage
}

const FossilFuelPage: FC<FossilFuelProps> = ({
  caseEntries,
  fossilFuelPageEntries,
}) => {
  const navItems = [
    { path: 'uofiInvestments', text: 'University of Illinois Investments' },
    { path: 'dirtyIndustry', text: 'The Dirty Industry UIUC Supports' },
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

      <div id="uofiInvestments" className="pt-20">
        <UniversityInvestments
          img={fossilFuelPageEntries['treeMap']}
          caption={fossilFuelPageEntries['uofIInvestments']}
        />
      </div>
      <div id="dirtyIndustry" className="pt-20">
        <DirtyIndustry />
      </div>
      <div id="whyFossilFuelsAreBad" className="pt-20">
        <FossilFuelsBad
          text={fossilFuelPageEntries['whyAreFossilFuelsBad']}
          caption={fossilFuelPageEntries['climateClock']}
        />
      </div>
      <div id="warming">
        <WhatWarningMeans />
      </div>
      <div id="financialCase" className="pt-20">
        <FinancialCase
          entries={caseEntries}
          text={fossilFuelPageEntries['divestmentCase']}
          img={fossilFuelPageEntries['divestmentGraph']}
        />
      </div>
      <div id="divestedSchools" className="pt-20">
        <SchoolsDivested />
      </div>
      <div id="divestedInstitutions" className="pt-20">
        <InstitutionsDivested />
      </div>
    </>
  )
}

export default FossilFuelPage
