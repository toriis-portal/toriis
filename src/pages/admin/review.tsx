import { ReviewRequest } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { api } from '../../utils/api'

const ReviewPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const { data, isLoading } = api.request.getAllRequests.useQuery()

  if (isLoading || !data) return <div>Loading...</div>

  console.log(data as ReviewRequest[])

  return <div>{session &&
    <>
      <h1>Request Management</h1>
      {(data).map((request) => (
        <div key={request.id}>
          {request.updates[0]?._id}
        </div>
      ))}
    </>
  }</div>
}

export default ReviewPage
