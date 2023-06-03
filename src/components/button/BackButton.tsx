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
          'flex w-fit place-content-center items-center justify-center truncate p-4',
          'shadow-gray shadow-lg',
          'rounded-3xl border-[0.05rem] border-black py-1',
        ),
      )}
    >
      <ArrowSmallLeftIcon className="mr-1.5 inline w-[1rem] stroke-current stroke-1" />
      <p>{text}</p>
    </button>
  )
}

export default BackButton
