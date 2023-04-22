import type { FC } from 'react'
import { useRouter } from 'next/router'
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

interface BackButtonProps {
  customText?: string
  customLink?: string
}

const BackButton: FC<BackButtonProps> = ({
  customText = 'Back',
  customLink,
}) => {
  const router = useRouter()

  const handleClick = () => {
    if (customLink) {
      void router.push(customLink)
    } else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        clsx(
          'flex w-fit place-content-center items-center justify-center truncate p-4 font-inter text-sm lg:text-lg',
          'shadow-gray shadow-lg',
          'rounded-3xl border-[0.05rem] border-black py-1',
        ),
      )}
    >
      <ArrowSmallLeftIcon className="mr-1.5 inline w-[1rem] stroke-current stroke-1" />
      <p> {customText}</p>
    </button>
  )
}

export default BackButton
