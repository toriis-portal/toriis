import type { FC } from 'react'
import type { Request } from '@prisma/client'
import clsx from 'clsx'

import { datasetEnum } from '../../utils/enums'
import LimitedPopupBox from '../Text/LimitedPopupBox'
import StatusTag from '../Text/StatusTag'

interface RequestTableProps {
  requests: Request[] | undefined
  myRequests: boolean
  className?: string
}

const RequestReviewTable: FC<RequestTableProps> = ({
  requests,
  myRequests,
  className,
}) => {
  return (
    <div className={clsx('flex h-[450px] flex-col items-center', className)}>
      <table className="w-full table-fixed overflow-x-scroll py-12">
        <col className="w-[20%]" />
        <col className="w-[15%]" />
        <col className="w-[50%]" />
        <col className="w-[15%]" />
        <thead className="w-full items-center border-b-2 border-black pb-4 text-left text-base font-medium text-black">
          <tr>
            <th>Date Requested</th>
            <th>Database</th>
            <th>Comments</th>
            <th className="pl-10">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => {
            return request.updates.map((update) => {
              return (
                <tr
                  key={update.id}
                  className="border-b-2 border-lightGray text-base"
                >
                  <td className="py-3 text-black">
                    {request.createdAt.toLocaleDateString()}
                  </td>
                  <td className="text-darkTeal">
                    {datasetEnum[request.dataset]}
                  </td>
                  <td>
                    {request.comment && (
                      <LimitedPopupBox text={request.comment} />
                    )}
                  </td>
                  <td className="pl-10">
                    <div className="flex h-full items-center justify-end">
                      <StatusTag
                        type={request.status}
                        myRequests={myRequests}
                        className="w-full"
                      />
                    </div>
                  </td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RequestReviewTable
