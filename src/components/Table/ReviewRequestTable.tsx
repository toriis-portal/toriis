import type { FC } from 'react'
import type { Request } from '@prisma/client'
import clsx from 'clsx'

import { datasetEnum } from '../../utils/enums'
import { CommentModal, StatusTag } from '../../components'

interface RequestTableProps {
  requests: Request[]
  myRequests: boolean
  className?: string
}

const RequestReviewTable: FC<RequestTableProps> = ({
  requests,
  myRequests,
  className,
}) => {
  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <table className="w-full table-fixed overflow-x-scroll py-12">
        <colgroup>
          <col className="w-[20%]" />
          <col className="w-[15%]" />
          <col className="w-[50%]" />
          <col className="w-[15%]" />
        </colgroup>
        <thead className="w-full items-center border-b-2 border-black pb-4 text-left">
          <tr>
            <th>Date Requested</th>
            <th>Database</th>
            <th>Comments</th>
            <th className="pl-10">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            return (
              <tr key={request.id} className="border-b-2 border-lightGray py-3">
                <td className="py-3 text-black">
                  {request.createdAt.toLocaleDateString()}
                </td>
                <td className="text-darkTeal">
                  {datasetEnum[request.dataset]}
                </td>
                <td>
                  {request.comment && <CommentModal text={request.comment} />}
                </td>
                <td className="pl-10">
                  <StatusTag
                    request={request}
                    isMyRequest={myRequests}
                    className="w-full"
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RequestReviewTable
