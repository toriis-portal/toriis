import { ReviewRequest } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'
import type { JSONObject } from 'superjson/dist/types'

import { api } from '../../utils/api'

const ReviewPage: FC = () => {
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

  console.log(data)

  return (
    <div>
      {session && (
        <>
          <h1>Request Management</h1>
          {data.map((request) => (
            <div key={request.id}>
              {(request.updates[0] as JSONObject)._id as string}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default ReviewPage
