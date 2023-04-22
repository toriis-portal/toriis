import type { FC } from 'react'
import type { Request } from '@prisma/client'
import clsx from 'clsx'
import { useRef, useEffect } from 'react'

import { datasetEnum } from '../../utils/enums'

interface RequestTableProps {
  requests: Request[] | undefined
  className?: string
}

const RequestReviewTable: FC<RequestTableProps> = ({ requests, className }) => {
  const commentRef = useRef(null)

  return (
    <div className={clsx('flex h-[450px] flex-col items-center', className)}>
      <table className="w-full table-fixed overflow-x-scroll py-12">
        <thead className="w-full items-center border-b-2 border-black pb-4 text-base font-medium text-black">
          <tr>
            <th className="w-[15%]">Date Requested</th>
            <th className="w-[15%]">Database</th>
            <th className="w-[55%]">Comments</th>
            <th className="w-[15%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => {
            return request.updates.map((update) => {
              return (
                <tr
                  key={update.id}
                  className="items-center border-b-2 border-lightGray text-base"
                >
                  <td className="w-[15%] text-black">
                    {request.createdAt.toLocaleDateString()}
                  </td>
                  <td className="w-[15%] text-darkTeal">
                    {datasetEnum[request.dataset]}
                  </td>
                  <td className="w-[55%] border border-lightGray p-1 pr-3">
                    <p ref={commentRef} className="truncate">
                      {request.comment}
                    </p>
                  </td>
                  <td className={clsx('w-[15%] text-right')}>Show More!</td>
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
