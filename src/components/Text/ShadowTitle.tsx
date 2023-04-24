import type { FC } from 'react'
import clsx from 'clsx'

interface TitleProps {
  text: string
}

const ShadowTitle: FC<TitleProps> = ({ text }) => {
  return (
    <div
      className={clsx(
        ' t3 w-fit rounded-full bg-white',
        'border-4 border-cobalt',
        'px-14 py-4',
        'shadow-[-8px_8px_0px_0px] shadow-cobalt',
        'first-line:z-10',
      )}
    >
      <p className=" text-darkTeal ">{text}</p>
    </div>
  )
}

export default ShadowTitle
