import type { FC } from 'react'

import { PrimaryNavBar, ToTopButton, HighlightedTitle } from '../../components'
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
      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
      </div>
    </>
  )
}

export default FossilFuelPage
