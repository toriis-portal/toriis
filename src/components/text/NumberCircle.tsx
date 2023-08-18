import type { FC } from 'react'
import clsx from 'clsx'

interface NumberCircleProps {
  val: number
}

const NumberCircle: FC<NumberCircleProps> = ({ val }) => {
  return (
    <>
      <div
        className={clsx(
          'flex items-center justify-center rounded-full border-2 border-cobalt bg-white shadow-[-6px_6px] shadow-cobalt',
          'h-[2.5rem] min-h-[2.5rem] w-[2.5rem] min-w-[2.5rem]',
          'md:h-[3rem] md:min-h-[3rem] md:w-[3rem] md:min-w-[3rem]',
          'header-2 text-cobalt',
        )}
      >
        <p className="header-3 md:header-2 text-cobalt">{val}</p>
      </div>
    </>
  )
}

export default NumberCircle
