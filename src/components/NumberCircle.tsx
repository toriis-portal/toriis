import type { FC } from 'react'

interface NumberCircleProps {
  val: string
}

const NumberCircle: FC<NumberCircleProps> = ({ val }) => {
  return (
    <>
      <div className="flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-cobalt bg-white shadow-circleCobalt">
        <p className="font-klima text-3xl font-bold text-cobalt">{val}</p>
      </div>
    </>
  )
}

export default NumberCircle
