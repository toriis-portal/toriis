import type { FC } from 'react'

interface NumberCircleProps {
  val: number
}

const NumberCircle: FC<NumberCircleProps> = ({ val }) => {
  return (
    <>
      <div className="flex h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] items-center justify-center rounded-full border-2 border-cobalt bg-white shadow-[-6px_6px] shadow-cobalt">
        <p className="t2 text-cobalt">{val}</p>
      </div>
    </>
  )
}

export default NumberCircle
