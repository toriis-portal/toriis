import type { FC } from 'react'

const ChartDetailsCard: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="body-normal rounded-xl bg-[#F4F4F4] p-4 leading-snug">
      {children}
    </div>
  )
}

export default ChartDetailsCard
