import type { FC } from 'react'

interface CardProps {
  title: string
}

const CompanyCard: FC<CardProps> = ({ title }) => {
  return (
    <div className="flex max-w-fit rounded-full bg-lightBlue px-[22px] py-0 text-lg font-medium">
      {title}
    </div>
  )
}

export default CompanyCard
