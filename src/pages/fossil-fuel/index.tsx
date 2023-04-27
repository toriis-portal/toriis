import type { FC } from 'react'

import {
  PrimaryNavBar,
  ToTopButton,
  HighlightedTitle,
  SecondaryNavBar,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FinancialCase } from '../../sections'
import { FossilFuelPage } from '../../types'
import type { CaseEntry } from '../../types'
import UniversityInvestments from '../../sections/fossil-fuel/UniversityInvestments'
import DirtyIndustry from '../../sections/fossil-fuel/DirtyIndustry'
import FossilFuelsBad from '../../sections/fossil-fuel/FossilFuelsBad'
import WhatWarningMeans from '../../sections/fossil-fuel/WhatWarningMeans'
import SchoolsDivested from '../../sections/fossil-fuel/SchoolsDivested'
import InstitutionsDivested from '../../sections/fossil-fuel/InstitutionsDivested'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const caseEntries = await contentClient.get('case')
  const fossilFuelPageEntries: FossilFuelPage | undefined =
    await contentClient.getAllFossilFuelPageEntries()

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
      <div id="warning" className="pt-20">
        <WhatWarningMeans />
      </div>

      <div id="financialCase" className="pt-20">
        <FinancialCase
          entries={caseEntries}
          text={fossilFuelPageEntries['divestmentCase']}
          img={fossilFuelPageEntries['divestmentGraph']}
        />
      </div>

      {/* More placeholders for fossil fuel page sections: */}
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
