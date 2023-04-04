import type { FC } from 'react'
import { useRouter } from 'next/router'
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
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
          'flex w-[5rem] place-content-center items-center justify-center font-klima text-[1.1rem]',
          'shadow-gray shadow-lg',
          'rounded-3xl border-[0.05rem] border-black py-1 ',
        ),
      )}
    >
      <ArrowSmallLeftIcon className="mr-1 inline w-[1rem] stroke-current stroke-1" />
      <p> Back</p>
    </button>
  )
}

export default BackButton
