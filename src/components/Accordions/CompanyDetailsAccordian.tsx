import type { FC } from 'react'
import React from 'react'

interface CompanyDetailsAccordianProps {
  content: string
}

const CompanyDetailsAccordian: FC<CompanyDetailsAccordianProps> = ({
  content,
}) => {
  return <div>{content}</div>
}

export default CompanyDetailsAccordian
