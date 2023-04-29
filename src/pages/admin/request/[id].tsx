import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { AdminNavBar, PrimaryButton, Toast } from '../../../components'
import { api } from '../../../utils/api'

const ReviewPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const requestId = (useRouter().query.id as string) ?? ''

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const updateRequestMutation = api.request.updateRequest.useMutation({})

  return (
    <div>
      {session && (
        <>
          <AdminNavBar />
          <div className="flex w-full flex-col items-center justify-center px-20 py-20">
            <div className="mb-10">Table goes here</div>
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
