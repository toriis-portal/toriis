import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { HighlightedTitle, BackButton, AuthButton } from '../../components'

const AdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  console.log(session?.user)

  return (
    session && (
      <div>
        <div className="flex flex-row items-center	justify-between px-10">
          <div className="h-10">
            <BackButton customLink="/home" customText="Back To Home" />
          </div>
          <div className="mt-10">
            <HighlightedTitle
              title="Administration Control"
              size="large"
              color="clementine"
            ></HighlightedTitle>
          </div>
          <div className="flex w-fit flex-col justify-center">
            <AuthButton />
          </div>
        </div>
      </div>
    )
  )
}

export default AdminPage
