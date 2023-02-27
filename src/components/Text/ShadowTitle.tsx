import type { FC } from 'react'

interface TitleProps {
  text: string
}

const ShadowTitle: FC<TitleProps> = ({ text }) => {
  return (
    <div className="w-fit rounded-full border-4 border-cobalt bg-white px-14 py-4 font-medium shadow-cobalt first-line:z-10">
      <p className="text-3xl text-darkTeal ">{text}</p>
    </div>
  )
}

export default ShadowTitle
