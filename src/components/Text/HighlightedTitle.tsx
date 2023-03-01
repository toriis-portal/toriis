import type { FC } from 'react'

interface TitleProps {
  title: string
}

const HighlightedTitle: FC<TitleProps> = ({ title }) => {
  return (
    <>
      <div className="mb-12 ml-[1.4rem] w-fit">
        <div className="relative right-[1.4rem] -bottom-[1.8rem] z-0 h-3.5 bg-clementine" />
        <p className="relative z-10 font-klima text-[32px] font-medium">
          {title}
        </p>
      </div>
    </>
  )
}

export default HighlightedTitle
