import type { FC } from 'react'

import SampleText from '../components/SampleText'

interface InputProps {
  name: string
  text: string
}

const SampleSection: FC<InputProps> = ({ name, text }) => {
  return (
    <>
      <div className="h-screen border-spacing-1 bg-slate-200 text-6xl">
        {text}
      </div>
    </>
  )
}

export default SampleSection
