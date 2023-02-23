import type { FC } from 'react'

interface props {
  title: string
}

const HighlightedTitle: FC<props> = ({ title }) => {
  return (
    <>
      <div className="absolute">
        <div className="absolute inset-y-5 -inset-x-4 z-0 h-2 w-full bg-orange bg-opacity-60" />
        <p className="relative z-10">{title}</p>
      </div>
    </>
  )
}

export default HighlightedTitle
