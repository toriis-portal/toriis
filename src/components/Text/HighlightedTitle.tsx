import type { FC } from 'react'
import clsx from 'clsx'
interface TitleProps {
  title: string
  size: 'medium' | 'large'
  color: string
  padded?: boolean
}

const HighlightedTitle: FC<TitleProps> = ({
  title,
  size,
  color,
  padded = true,
}) => {
  return (
    <>
      <div className={clsx('ml-[1.4rem] w-fit', padded && 'mb-12 ')}>
        <div
          className={clsx(
            'relative z-0',
            `bg-${color}`,
            { 'right-[.6rem] -bottom-[1.7rem] h-2 w-11/12': size == 'medium' },
            { 'right-[1.3rem] -bottom-[1.9rem] h-3.5': size == 'large' },
          )}
        />
        <p
          className={clsx(
            'relative z-10 whitespace-nowrap',
            { 'font-klima text-[32px] font-medium': size == 'large' },
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
