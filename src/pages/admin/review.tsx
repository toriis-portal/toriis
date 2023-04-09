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

  console.log(data)

  return <div>{session && <h1>Request Management</h1>}</div>
}

export default ReviewPage
