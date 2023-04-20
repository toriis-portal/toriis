import type { FC } from 'react'
import type { Request } from '@prisma/client'

interface RequestTableProps {
  requests: Request[] | undefined
  className?: string
}

const RequestReviewTable: FC<RequestTableProps> = ({ requests, className }) => {
  return <></>
}

export default RequestReviewTable
