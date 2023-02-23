import type { FC } from 'react'

interface InputProps {
  text: string
}

const SampleSection: FC<InputProps> = ({ text }) => {
  return (
    <>
      <div className="h-screen border-spacing-1 bg-slate-200 text-6xl">
        {text}
      </div>
    </>
  )
}

export default SampleSection
