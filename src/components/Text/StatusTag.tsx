import clsx from 'clsx'
import Link from 'next/link'
import type { FC } from 'react'
import { RequestStatus } from '@prisma/client'
import type { Request } from '@prisma/client'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

import { requestStatusEnum } from '../../utils/enums'

interface StatusTagProps {
  request: Request
  isMyRequest: boolean
  className?: string
}

const StatusTag: FC<StatusTagProps> = ({ request, isMyRequest, className }) => {
  const pendingReview = request.status == RequestStatus.PENDING && !isMyRequest
  return (
    <Link
      href={pendingReview ? `/admin/request/${request.id}` : '#'}
      className={clsx(
        'flex max-h-6 min-w-fit justify-center rounded-full',
        'body-normal truncate text-center',
        {
          'bg-brightTeal text-white': request.status == RequestStatus.APPROVED,
          'bg-clementine text-white':
            request.status == RequestStatus.PENDING && isMyRequest,
          'bg-pumpkin text-white': request.status == RequestStatus.REJECTED,
          '-m-[1px] border border-black bg-white text-black': pendingReview,
        },
        className,
      )}
    >
      {pendingReview ? 'Review' : requestStatusEnum[request.status]}
      {pendingReview && (
        <ArrowRightIcon className="ml-2 mt-1 inline h-4 w-auto stroke-current stroke-1" />
      )}
    </Link>
  )
}

export default StatusTag
