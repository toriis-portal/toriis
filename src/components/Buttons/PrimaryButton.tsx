import type { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import clsx from 'clsx'

interface PrimaryButtonProps {
  text: string
  link?: string
  onClick?: () => void
  className?: string
  hasArrow?: boolean
  variant?: 'cobalt' | 'clementine'
  type?: 'submit' | 'button' | 'reset' | undefined
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  link,
  onClick,
  className = '',
  hasArrow = true,
  variant = 'cobalt',
  type = undefined,
}) => {
  const buttonStyle = clsx(
    'font-klima text-[18px] font-semibold',
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

  if (!!link) {
    return (
      <div>
        <Link href={link}>
          <div>
            <button type={type} className={buttonStyle}>
              {text}
              {hasArrow && (
                <ArrowRightIcon className="ml-1 inline h-9 w-5 stroke-current stroke-1" />
              )}
            </button>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={onClick || undefined} className={buttonStyle}>
          {text}
        </button>
      </div>
    </div>
  )
}

export default PrimaryButton
