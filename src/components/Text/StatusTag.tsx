import clsx from 'clsx'
import type { FC } from 'react'
import { RequestStatus } from '@prisma/client'

import { requestStatusEnum } from '../../utils/enums'

interface StatusTagProps {
  type: RequestStatus
  myRequests: boolean
  className?: string
}

const StatusTag: FC<StatusTagProps> = ({ type, myRequests, className }) => {
  console.log(type)
  return (
    <div
      className={clsx(
        'max-h-6 justify-center rounded-full',
        'text-center text-base',
        {
          'bg-brightTeal text-white': type == RequestStatus.APPROVED,
          'bg-clementine text-white':
            type == RequestStatus.PENDING && myRequests,
          'bg-pumpkin text-white': type == RequestStatus.REJECTED,
          '-m-[1px] border border-black bg-white text-black':
            type == RequestStatus.PENDING && !myRequests,
        },
        className,
      )}
    >
      {requestStatusEnum[type]}
      {type == RequestStatus.PENDING && !myRequests && '-->'}
    </div>
  )
}

export default StatusTag
