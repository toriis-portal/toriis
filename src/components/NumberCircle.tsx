import type { FC } from 'react'

interface NumberCircleProps {
  val: string
}

const NumberCircle: FC<NumberCircleProps> = ({ val }) => {
  return (
    <>
      <div className="flex h-12 w-12  items-center justify-center rounded-3xl border-2 border-cobalt bg-white text-center font-klima text-3xl font-bold text-cobalt shadow-circleCobalt">
        <p>{val}</p>
      </div>
    </>
  )
}

export default NumberCircle