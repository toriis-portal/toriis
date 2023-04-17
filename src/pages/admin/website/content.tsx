import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import ContentfulButton from '../../../components/Buttons/ContentfulButton'

const ContentPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    <div>
      {session && (
        <>
          <h1>Update Text Content</h1>
          <div className="h-screen w-screen">
            {session && <h1>Website Management</h1>}
            <ContentfulButton />
          </div>
        </>
      )}
    </div>
  )
}

export default ContentPage
