import type { FC } from 'react'
import { StringArraySupportOption } from 'prettier'
import type { Document } from '@contentful/rich-text-types'
import type { Asset } from 'contentful'

import {
  PrimaryNavBar,
  ToTopButton,
  HighlightedTitle,
  SecondaryNavBar,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FinancialCase } from '../../sections'
import type { CaseEntry } from '../../types'
import UniversityInvestments from '../../sections/fossil-fuel/UniversityInvestments'
import DirtyIndustry from '../../sections/fossil-fuel/DirtyIndustry'
import FossilFuelsBad from '../../sections/fossil-fuel/FossilFuelsBad'
import WhatWarningMeans from '../../sections/fossil-fuel/WhatWarningMeans'
import SchoolsDivested from '../../sections/fossil-fuel/SchoolsDivested'
import InstitutionsDivested from '../../sections/fossil-fuel/InstitutionsDivested'

const fossilFuelPageEntryTypes = [
  'treeMap',
  'uofIInvestments',
  'whyAreFossilFuelsBad',
  'climateClock',
  'warmingMeans',
  'divestmentCase',
  'divestmentGraph',
  'divestedSchools',
  'divestedInstitutions',
]

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const caseEntries = await contentClient.get('case')

  const fossilFuelPageEntryMap: Record<string, Asset | Document | string> = {}

  await Promise.all(
    fossilFuelPageEntryTypes.map(async (entity: string) => {
      const results = await contentClient.get('fossilFuelPage')
      // console.log('LOOK')
      // console.log(results[0][entity])
      fossilFuelPageEntryMap[entity] = results[0][entity]
    }),
  )

  return {
    props: {
      caseEntries,
      fossilFuelPageEntryMap,
    },
  }
}

interface FossilFuelProps {
  caseEntries: CaseEntry[]
  fossilFuelPageEntryMap: Record<string, Asset | Document | string>
}

const FossilFuelPage: FC<FossilFuelProps> = ({
  caseEntries,
  fossilFuelPageEntryMap,
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
          img={fossilFuelPageEntryMap['treeMap']}
          caption={fossilFuelPageEntryMap['uofIInvestments']}
        />
      </div>
      <div id="dirtyIndustry" className="pt-20">
        <DirtyIndustry />
      </div>
      <div id="whyFossilFuelsAreBad" className="pt-20">
        <FossilFuelsBad />
      </div>
      <div id="warning" className="pt-20">
        <WhatWarningMeans />
      </div>

      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
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
