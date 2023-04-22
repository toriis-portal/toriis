import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { AdminNavBar } from '../../../components'
import { api } from '../../../utils/api'

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
          <AdminNavBar />
          {data.map((request) => (
            <div key={request.id}>
              {request.updates.map((update) => (
                <p key={update.id}>{update.name}</p>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default RequestPage
