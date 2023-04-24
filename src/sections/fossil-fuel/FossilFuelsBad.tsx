import type { FC } from 'react'

import { ClimateClock } from '../../components'
import { HighlightedTitle } from '../../components'

const FossilFuelsBad: FC = () => {
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="Why Are Fossil Fuels Bad"
        size="large"
        color="clementine"
      />
      <ClimateClock />
    </div>
  )
}
export default FossilFuelsBad
