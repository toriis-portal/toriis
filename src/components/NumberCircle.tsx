import type { FC } from 'react'

interface NumberCircleProps {
  val: string
}

const NumberCircle: FC<NumberCircleProps> = ({ val }) => {
  return (
    <>
      <div className="flex h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] items-center justify-center rounded-full border-2 border-cobalt bg-white shadow-[-6px_6px_#0F81E8]">
        <p className="font-klima text-[32px] font-[559] text-cobalt">{val}</p>
      </div>
    </>
  )
}

export default NumberCircle
