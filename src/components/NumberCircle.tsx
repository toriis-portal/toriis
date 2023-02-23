import type { FC } from 'react'

interface props {
  val: string
}

const NumberCircle: FC<props> = ({ val }) => {
  return (
    <>
      <div className="h-15 w-15 mt-4 flex items-center justify-center">
        <div className="relative z-0 h-12 w-12 rounded-3xl bg-colbalt text-colbalt">
          <div className="absolute inset-x-2 -inset-y-2 h-12 w-12 rounded-3xl border-2 border-colbalt bg-white text-center text-3xl font-bold leading-10 text-colbalt">
            <p>{val}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NumberCircle
