import type { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import clsx from 'clsx'

interface PrimaryButtonProps {
  text: string
  link?: string
  hasArrow?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, link, hasArrow=true, className, type = "button" }) => {
  const button = (
    <button
      type={type}
      className={clsx(
        className,
        'font-semibold font-klima text-[18px] ',
        'rounded border-2 border-solid border-cobalt',
        'rounded bg-lightBlue px-5 py-1',
        'shadow-[-8px_8px_0px_0px] shadow-cobalt',
        'hover:shadow-[-5px_5px_0px_0px] hover:shadow-cobalt',
      )}
    >
      {text}{' '}
      {hasArrow && <ArrowRightIcon className="inline h-9 w-5 stroke-current stroke-1" />}
    </button>
  )

  return link ? (
    <Link href={link}>
      <div>{button}</div>
    </Link>
  ) : (
    <div>{button}</div>
  )
}

export default PrimaryButton
