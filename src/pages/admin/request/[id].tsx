import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type {
  Company,
  Dataset,
  Investment,
  Fuel,
  Emission,
  Energy,
} from '@prisma/client'

import { AdminNavBar, PrimaryButton, Toast } from '../../../components'
import { api } from '../../../utils/api'
import { DynamicTable } from '../../../components/Table/DynamicTable'
import { getColumns } from '../../../components/Table/DynamicTable/Columns'
import type { Column } from '../../../components/Table/DynamicTable/DynamicTable'
import type { StrictUpdateType } from '../../../types'

const ReviewPage: FC = () => {
  type DataSetTypes = Company | Investment | Fuel | Emission | Energy
  type DataSetColumns = Column<DataSetTypes>[]
  interface baseChangedEntries {
    id: string
    changedEntries: (keyof (Company | Investment))[]
  }

  type UpdateTypesWithChangedEntries = DataSetTypes & baseChangedEntries

  const { data: session, status } = useSession()
  const { push } = useRouter()
  const requestId = useRouter().query.id as string
  const [dataset, setDataset] = useState<Dataset>('COMPANY')
  const [columns, setColumns] = useState<DataSetColumns>(
    getColumns('COMPANY', true) as DataSetColumns,
  )
  const [origData, setOrigData] = useState<UpdateTypesWithChangedEntries[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const updateRequestMutation = api.request.updateRequest.useMutation({})
  const { data, isLoading } = api.request.getRequestDataDiff.useQuery(
    { id: requestId },
    { enabled: !!requestId, refetchOnWindowFocus: false, retry: false },
  )

  type DataDiffType = {
    old: Company[] | Investment[]
    new: StrictUpdateType[]
    request: Request
  }

  useEffect(() => {
    if (dataset === 'COMPANY') {
      const companyData = (data?.old as unknown as Company[]) ?? []
      setOrigData(
        companyData.map((company) => {
          return {
            ...company,
            changedEntries: [],
          }
        }),
      )
    } else if (dataset === 'INVESTMENT') {
      const investmentData = (data?.old as unknown as Investment[]) ?? []
      setOrigData(
        investmentData.map((investment) => {
          return {
            ...investment,
            changedEntries: [],
          }
        }),
      )
    }
  }, [dataset, data])

  return (
    <div>
      {session && (
        <>
          <AdminNavBar />
          <div className="flex w-full flex-col items-center justify-center gap-10 px-20 py-20">
            <DynamicTable rows={origData} columns={columns} />
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
