import type { FC } from 'react'
import { useRouter } from 'next/router'
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

interface BackButtonProps {
  text?: string
  link?: string
}

const BackButton: FC<BackButtonProps> = ({ text = 'Back', link }) => {
  const router = useRouter()

  const handleClick = () => (link ? void router.push(link) : router.back())

  return (
    <button
      onClick={handleClick}
      className={clsx(
        clsx(
          'flex w-fit place-content-center items-center justify-center truncate px-2 md:p-4',
          'shadow-gray shadow-lg',
          'rounded-3xl border-[0.05rem] border-black py-2 md:py-1',
        ),
      )}
    >
      <ArrowSmallLeftIcon className="inline w-7 stroke-current stroke-1 md:mr-1.5 md:w-[1rem]" />
      <p className="hidden md:block">{text}</p>
    </button>
  )
}

export default BackButton
