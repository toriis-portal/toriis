import type { FC } from 'react'

import { HighlightedTitle } from '../components'

interface InputProps {
  text: string
}

const SampleSection: FC<InputProps> = ({ text }) => {
  return (
    <div className="h-[400px] border-spacing-1 text-6xl">
      <HighlightedTitle title={text} />
    </div>
  )
}

export default SampleSection
