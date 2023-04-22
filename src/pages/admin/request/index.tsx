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
          <h1>Request Management</h1>
          <div className="flex flex-col items-center">
            <RequestReviewTable requests={data} className={'w-5/6'} />
            {data.map((request) => (
              <div key={request.id}>
                {request.updates.map((update) => (
                  <p key={update.id}>{update.name}</p>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RequestPage
