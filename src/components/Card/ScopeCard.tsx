import type { FC } from 'react'

const ScopeCard: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className=" col-span-2 ml-20 rounded-xl bg-lightClementine p-4 font-inter text-base leading-snug">
      {children}
    </div>
  )
}

export default ScopeCard
