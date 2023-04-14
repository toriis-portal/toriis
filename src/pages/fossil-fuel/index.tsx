import type { FC } from 'react'

import { PrimaryNavBar, ToTopButton } from '../../components'
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
  return (
    <>
      <PrimaryNavBar />
      <ToTopButton />
      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
      </div>
      <ClimateClock />
    </>
  )
}

export default FossilFuelPage
