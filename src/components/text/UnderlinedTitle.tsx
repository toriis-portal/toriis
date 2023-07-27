import type { FC } from 'react'
import clsx from 'clsx'
interface TitleProps {
  title: string
  size: 'medium' | 'large'
  color: string
  padded?: boolean
}

const UnderlinedTitle: FC<TitleProps> = ({
  title,
  size,
  color,
  padded = true,
}) => {
  return (
    <>
      <div className={clsx('w-fit', padded && 'mb-12')}>
        <div
          className={clsx(
            'relative z-0',
            `bg-${color}`,
            { '-bottom-[1.7rem] h-2': size == 'medium' },
            { '-bottom-[1.9rem] h-2': size == 'large' },
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

export default UnderlinedTitle
