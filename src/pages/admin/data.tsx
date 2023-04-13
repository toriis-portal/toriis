import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import ContentfulButton from '../../components/Buttons/ContentfulButton'
const AdminWebPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    <>
      <div className="h-screen w-screen">
        {session && <h1>Website Management</h1>}
        <ContentfulButton />
      </div>
    </>
  )
}

export default AdminWebPage
