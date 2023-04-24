import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { AdminNavBar } from '../../../components'

const ReviewPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const requestId = (useRouter().query.id as string) ?? ''

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    <div>
      {session && (
        <>
          <AdminNavBar />
          <h1>Review a Request with id {requestId}</h1>
        </>
      )}
    </div>
  )
}

export default ReviewPage
