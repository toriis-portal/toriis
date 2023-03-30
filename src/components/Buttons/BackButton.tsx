import type { FC } from 'react'
import { useRouter } from 'next/router'
import { ArrowBack } from '@material-ui/icons'
import clsx from 'clsx'

const BackButton: FC = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        clsx(
          'justify-centerfont-klima flex w-20 place-content-center items-center text-[18px]',
          'shadow-gray shadow-lg',
          'rounded-3xl border-[1px] border-black py-1 px-3',
        ),
      )}
    >
      <ArrowBack style={{ fontSize: 20 }} />
      <p className="font-[400]"> Back</p>
    </button>
  )
}

export default BackButton
