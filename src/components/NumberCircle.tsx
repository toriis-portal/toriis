import type { FC } from 'react'

interface props {
  val: string
}

const NumberCircle: FC<props> = ({ val }) => {
  return (
    <>
      <div className="h-12 w-12 rounded-3xl border-2 border-colbalt bg-white text-center text-3xl font-bold leading-10 text-colbalt shadow-circleCobalt">
        <p>{val}</p>
      </div>
    </>
  )
}

export default NumberCircle
