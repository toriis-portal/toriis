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
      <div
        className={clsx(
          'w-fit',
          padded && 'mb-12',
          size == 'large' && 'ml-[1.4rem]',
        )}
      >
        <div
          className={clsx(
            'relative z-0',
            `bg-${color}`,
            { '-bottom-[1.7rem] right-[.6rem] h-2 w-11/12': size == 'medium' },
            { '-bottom-[1.9rem] right-[1.3rem] h-3.5': size == 'large' },
          )}
        />
        <p
          className={clsx(
            'relative z-10 whitespace-nowrap !font-medium',
            { 'header-2 md:header-1': size == 'large' },
            { 'header-3 md:header-2': size == 'medium' },
          )}
        >
          {title}
        </p>
      </div>
    </>
  )
}

export default HighlightedTitle
