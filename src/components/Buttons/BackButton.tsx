import type { FC } from 'react'
import Link from 'next/link'
import { ArrowBack } from '@material-ui/icons'
import clsx from 'clsx'

const PrimaryButton: FC = () => {
  return (
    <div>
      <Link href={}>
        <div>
          <button>
            <ArrowBack className="inline h-9 w-5 stroke-current stroke-1" />
          </button>
        </div>
      </Link>
    </div>
  )
}

export default PrimaryButton
