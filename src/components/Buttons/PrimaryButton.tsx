import type { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import clsx from 'clsx'

import { fontOptions } from '../../utils/fontSizes'

interface PrimaryButtonProps {
  text: string
  link: string
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, link }) => {
  return (
    <div>
      <Link href={link}>
        <div>
          <button
            className={clsx(
              fontOptions.bb,
              'rounded border-2 border-solid border-cobalt',
              'rounded bg-lightBlue px-5 py-1',
              'shadow-[-8px_8px_0px_0px] shadow-cobalt',
              'hover:shadow-[-5px_5px_0px_0px] hover:shadow-cobalt',
            )}
          >
            {text}{' '}
            <ArrowRightIcon className="inline h-9 w-5 stroke-current stroke-1" />
          </button>
        </div>
      </Link>
    </div>
  )
}

export default PrimaryButton
