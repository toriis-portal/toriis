import type { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import clsx from 'clsx'

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  link?: string
  onClick?: () => void
  className?: string
  variant?: 'cobalt' | 'clementine'
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  link,
  onClick,
  className = '',
  variant = 'cobalt',
  ...props
}) => {
  const buttonStyle = clsx(
    'rounded border-2 border-solid',
    'rounded px-5 py-1',
    'shadow-[-8px_8px_0px_0px]',
    'hover:shadow-[-5px_5px_0px_0px]',
    {
      'bg-lightBlue border-cobalt shadow-cobalt hover:shadow-cobalt':
        variant === 'cobalt',
      'bg-white border-clementine shadow-clementine hover:shadow-clementine':
        variant === 'clementine',
    },
    className,
  )

  return (
    <div>
      {link ? (
        <Link href={link}>
          <button className={buttonStyle} {...props}>
            {text}
            <ArrowRightIcon className="ml-1 inline h-9 w-5 stroke-current stroke-1" />
          </button>
        </Link>
      ) : (
        <button onClick={onClick} className={buttonStyle} {...props}>
          {text}
        </button>
      )}
    </div>
  )
}

export default PrimaryButton
