import type { FC } from 'react'

interface TitleProps {
  title: string
}

const HighlightedTitle: FC<TitleProps> = ({ title }) => {
  return (
    <>
      <div className="absolute">
        <div className="absolute -inset-x-4 inset-y-4 z-0 h-2.5 w-full bg-clementine" />
        <p className="relative z-10 font-klima">{title}</p>
      </div>
    </>
  )
}

export default HighlightedTitle
