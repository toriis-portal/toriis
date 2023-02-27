import type { FC } from 'react'

interface InputProps {
  text: string
}

const ShadowTitle: FC<InputProps> = ({ text }) => {
  return (
    <div className="relative -top-12 z-10 rounded-full border-4 border-cobalt bg-white px-14 py-4 font-semibold shadow-cobalt">
      <p className="text-3xl text-darkTeal ">{text}</p>
    </div>
  )
}

export default ShadowTitle
