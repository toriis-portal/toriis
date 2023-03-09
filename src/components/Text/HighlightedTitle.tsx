import type { FC } from 'react'
import clsx from 'clsx'
interface TitleProps {
  title: string
  size: string
  color: string
}

const HighlightedTitle: FC<TitleProps> = ({ title, size, color }) => {
  // className={clsx('flex w-full items-center space-x-8 pr-16 pl-20 pt-6', {
  //   'pb-10': open,
  // })}
  return (
    <>
      <div className="mb-12 ml-[1.4rem] w-fit">
        <div
          className={clsx(
            'relative z-0',
            `bg-${color}`,
            { 'right-[.6rem] -bottom-[1.7rem] h-2 w-11/12': size == 'medium' },
            { 'right-[1.4rem] -bottom-[2rem] h-3.5': size == 'large' },
          )}
        />
        <p
          className={clsx(
            'relative z-10',
            { 'font-klima text-[32px] font-bold': size == 'large' },
            { 'font-intel text-[28px] font-medium': size == 'medium' },
          )}
        >
          {title}
        </p>
      </div>
    </>
  )
}

export default HighlightedTitle
