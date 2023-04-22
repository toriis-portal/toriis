import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { PrimaryButton, AdminNavBar } from '../../../components'
import { CONTENTFUL_LINK } from '../../../utils/constants'

const UpdateContent: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    <>
      {session && (
        <div>
          <div>
            <AdminNavBar />
          </div>
          <div className="flex w-screen flex-col items-center justify-center gap-8 pt-72">
            <h2 className="font-klima font-semibold">
              Manage site wide content through Contentful
            </h2>

            <PrimaryButton
              text="Go to Contentful"
              link={CONTENTFUL_LINK as string}
              className="flex items-center justify-center gap-2 !px-10 text-center"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateContent
