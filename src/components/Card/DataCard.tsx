import type { FC } from 'react'

const DataCard: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="rounded-xl bg-lightClementine p-4 font-inter text-base leading-snug">
      {children}
    </div>
  )
}

export default DataCard
