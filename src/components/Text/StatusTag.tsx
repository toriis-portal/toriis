import clsx from 'clsx'
import type { FC } from 'react'
import { RequestStatus } from '@prisma/client'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

import { requestStatusEnum } from '../../utils/enums'

interface StatusTagProps {
  type: RequestStatus
  myRequests: boolean
  className?: string
}

const StatusTag: FC<StatusTagProps> = ({ type, myRequests, className }) => {
  const pendingReview = type == RequestStatus.PENDING && !myRequests
  return (
    <div
      className={clsx(
        'flex max-h-6 min-w-fit justify-center rounded-full',
        'body-normal truncate text-center',
        {
          'bg-brightTeal text-white': type == RequestStatus.APPROVED,
          'bg-clementine text-white':
            type == RequestStatus.PENDING && myRequests,
          'bg-pumpkin text-white': type == RequestStatus.REJECTED,
          '-m-[1px] border border-black bg-white text-black': pendingReview,
        },
        className,
      )}
    >
      {pendingReview ? 'Review' : requestStatusEnum[type]}
      {pendingReview && (
        <ArrowRightIcon className="ml-2 mt-1 inline h-4 w-auto stroke-current stroke-1" />
      )}
    </div>
  )
}

export default StatusTag
