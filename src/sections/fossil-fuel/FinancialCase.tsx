import type { FC } from 'react'

import { HighlightedTitle, CaseAccordion } from '../../components'
import type { CaseEntry } from '../../types'

const FinancialCase: FC<{ entries: CaseEntry[] }> = ({ entries }) => {
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="Financial Case for Fossil Fuel Divestment"
        size="large"
        color="clementine"
      />
      {entries.map((entry, index) => (
        <div key={index}>
          <CaseAccordion content={entry} />
        </div>
      ))}
    </div>
  )
}
export default FinancialCase
