import type { FC } from 'react'

import { HighlightedTitle } from '../../components'

const InstitutionsDivested: FC = () => {
  return (
    <div className="bg-white px-12">
      <HighlightedTitle
        title="Institutions That Have Divested"
        size="large"
        color="clementine"
      />
    </div>
  )
}
export default InstitutionsDivested
