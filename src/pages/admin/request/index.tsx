import type { Company } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { api } from '../../../utils/api'
import { RequestReviewTable } from '../../../components'

const RequestPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const { data, isLoading } = api.request.getAllRequests.useQuery(undefined, {
    refetchOnWindowFocus: false,
    retry: false,
  })

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div>
      {/* Place holder, for demo purposes only */}
      {session && (
        <>
          <div className="flex flex-col items-center">
            <RequestReviewTable
              requests={data}
              myRequests={false}
              className={'w-5/6'}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default RequestPage
