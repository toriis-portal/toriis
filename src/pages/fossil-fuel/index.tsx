import type { FC } from 'react'

import {
  PrimaryNavBar,
  ToTopButton,
  HighlightedTitle,
  SecondaryNavBar,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FinancialCase } from '../../sections'
import type { CaseEntry } from '../../types'

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
    { path: '', text: 'University of Illinois Investments' },
    { path: '', text: 'The Dirty Industry UIUC Supports' },
    { path: '', text: 'Why Are Fossil Fuels Bad' },
    { path: '', text: 'What 1.5C Warning Means' },
    { path: 'financialCase', text: 'The Case For Institutional Divestments' },
    { path: '', text: 'Schools That Have Divested ' },
    { path: '', text: 'Institutions That Have Divested' },
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
      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
      </div>
    </>
  )
}

export default FossilFuelPage
