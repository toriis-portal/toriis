import type { FC } from 'react'
import * as React from 'react'

import { PrimaryNavBar, SecondaryNavBar, ToTopButton } from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FinancialCase } from '../../sections'
import type { CaseEntry } from '../../types'
import ClimateClock from '../../components/Displays/ClimateClock/ClimateClock'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const caseEntries = await contentClient.get('case')
  return {
    props: {
      caseEntries,
    },
  }
}

interface FossilFuelProps {
  caseEntries: CaseEntry[]
}

const FossilFuelPage: FC<FossilFuelProps> = ({ caseEntries }) => {
  const navItems = [
    {
      path: 'universityIllinoisInvestments ',
      text: 'University of Illinois Investments ',
    },
    {
      path: 'dirtyIndustryUIUCSupports',
      text: 'The Dirty Industry UIUC Supports',
    },
    { path: 'whyFossilFuelsBad?', text: 'Why are fossil fuels bad?' },
    { path: 'whatWarmingMeans:', text: 'What 1.5 C Warming Means:' },
    {
      path: 'caseInstitutionalDivestment',
      text: 'The Case for Institutional Divestment',
    },
    { path: 'schoolsDivested', text: 'Schools That Have Divested' },
    {
      path: 'institutionsDivested ',
      text: 'Institutions That Have Divested ',
    },
  ]
  return (
    <>
      <PrimaryNavBar />
      <SecondaryNavBar navItems={navItems} />
      <ToTopButton />
      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
      </div>
      <ClimateClock />
    </>
  )
}

export default FossilFuelPage
