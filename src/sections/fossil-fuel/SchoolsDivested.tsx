import type { FC } from 'react'

import { HighlightedTitle } from '../../components'

const SchoolsDivested: FC = () => {
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="Schools That Have Divested"
        size="large"
        color="clementine"
      />
    </div>
  )
}
export default SchoolsDivested
