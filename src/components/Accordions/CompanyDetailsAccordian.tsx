import type { FC } from 'react'
import React from 'react'

interface CompanyDetailsAccordianProps {
  content: string
}

const CompanyDetailsAccordian: FC<CompanyDetailsAccordianProps> = ({
  content,
}) => {
  return (
    <div className="mb-10 rounded-[10px] border-[3px]  border-cobalt bg-lightBlue px-10 py-5">
      {content}
    </div>
  )
}

export default CompanyDetailsAccordian
