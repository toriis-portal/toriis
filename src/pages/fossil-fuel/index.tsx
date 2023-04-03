import type { FC } from 'react'

import { ToTopButton } from '../../components'
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
      <ToTopButton />
      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
      </div>
    </>
  )
}

export default FossilFuelPage
