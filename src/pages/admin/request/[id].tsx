import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Company, Request } from '@prisma/client'
import { Dataset, RequestStatus } from '@prisma/client'

import { AdminNavBar, PrimaryButton, Toast } from '../../../components'
import { api } from '../../../utils/api'
import { getColumns } from '../../../components/table/DynamicTable/Columns'
import {
  DynamicTable,
  type Column,
} from '../../../components/table/DynamicTable/DynamicTable'
import type {
  UpdateTypesWithChangedEntries,
  DataSetTypes,
} from '../website/data'
import type { StrictUpdateType } from '../../../types'

type DataDiffType = {
  old: Company[]
  new: StrictUpdateType[]
  request: Request
}

const ReviewPage: FC = () => {
  type DataSetColumns = Column<DataSetTypes>[]

  const { data: session, status } = useSession()
  const { push } = useRouter()
  const requestId = useRouter().query.id as string
  const [columns, setColumns] = useState<DataSetColumns>(
    getColumns(Dataset.COMPANY, false) as DataSetColumns,
  )

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const updateRequestMutation = api.request.updateRequest.useMutation({})
  const { data, isError } = api.request.getRequestDataDiff.useQuery(
    { id: requestId },
    {
      enabled: !!requestId,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess: (data) => {
        setColumns(getColumns(data.request.dataset, false) as DataSetColumns)
      },
    },
  )

  if (isError || !data) {
    return <div className="text-cent">Something went wrong</div>
  }

  /**
   * Merges old and new data in the request to populate the table
   * @param data old and new data to be merged
   * @returns merged data with updates replacing original values and changed entries array populated
   */
  const mergeEntries = (data: DataDiffType) => {
    const mergedData = data.old.map((oldEntry) => {
      const matchedNewEntries = data.new.filter(
        (newEntry) => newEntry.id === oldEntry.id,
      )
      type KeyType = keyof typeof oldEntry
      type KeyTypeMap<T> = { [KEY in KeyType]: T }
      const updatedOldEntry = { ...oldEntry } as KeyTypeMap<
        string | number | boolean
      >
      const changedKeys: string[] = []
      matchedNewEntries.forEach((newEntry) => {
        if (newEntry.value) {
          updatedOldEntry[newEntry.key as KeyType] = newEntry.value
          changedKeys.push(newEntry.key as string)
        }
      })
      return {
        ...updatedOldEntry,
        changedEntries: changedKeys,
      } as UpdateTypesWithChangedEntries
    })
    return mergedData
  }

  return (
    <div>
      {session && (
        <>
          <AdminNavBar />
          <div className="flex w-full flex-col items-center justify-center gap-10 px-20 py-20">
            <DynamicTable rows={mergeEntries(data)} columns={columns} />
            {data.request.status == RequestStatus.PENDING ? (
              <div className="flex-between flex flex-row gap-12">
                <PrimaryButton
                  text="Reject Request"
                  onClick={() =>
                    updateRequestMutation.mutate({
                      id: requestId,
                      updateAction: 'reject',
                    })
                  }
                  variant="clementine"
                  className="!px-10 !py-2"
                />
                <PrimaryButton
                  text="Approve Request"
                  onClick={() =>
                    updateRequestMutation.mutate({
                      id: requestId,
                      updateAction: 'approve',
                    })
                  }
                  className="!px-10 !py-2"
                />
              </div>
            ) : (
              <div>This request is {data.request.status}</div>
            )}
          </div>
          {updateRequestMutation.isError && (
            <Toast type="error" message={updateRequestMutation.error.message} />
          )}
          {updateRequestMutation.isSuccess && (
            <Toast
              type="success"
              message={updateRequestMutation.data as string}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ReviewPage
