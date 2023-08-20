import type { FC, ReactNode } from 'react'

const UnderlinedTitle: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <p className="underline decoration-clementine decoration-8">{children}</p>
  )
}

export default UnderlinedTitle
