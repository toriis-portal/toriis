import type { FC } from 'react'
import clsx from 'clsx'

interface TitleProps {
  title: string
  size: 'medium' | 'large'
  color: string
  padded?: boolean
  fillWidthOnMobile?: boolean
}

const HighlightedTitle: FC<TitleProps> = ({
  title,
  size,
  color,
  padded = true,
  fillWidthOnMobile = false,
}) => {
  return (
    <>
      <div
        className={clsx(
          fillWidthOnMobile ? 'w-full sm:w-fit' : 'w-fit',
          padded && 'mb-12',
          size == 'large' && 'sm:ml-[1.4rem]',
          'break-words',
        )}
      >
        <div
          className={clsx(
            'relative z-0',
            `bg-${color}`,
            { '-bottom-[1.7rem] right-[.6rem] h-2 w-11/12': size == 'medium' },
            { '-bottom-[1.9rem] right-[1.3rem] h-3.5': size == 'large' },
            'hidden sm:block',
          )}
        />
        <p
          className={clsx(
            'relative z-10 !font-medium',
            { 'header-2 md:header-1': size == 'large' },
            { 'header-3 md:header-2': size == 'medium' },
            'break-words',
            'leading-8',
            'text-center sm:text-left',
          )}
        >
          {title}
        </p>
      </div>
    </>
  )
}

export default HighlightedTitle
