import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { PrimaryButton } from '../../../components'
import { CONTENTFUL_LINK } from '../../../utils/constants'

const ContentPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    <>
      <h1 className="">Update Text Content</h1>

      {session && (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
          <h2 className="font-klima font-semibold">
            Manage site wide content through Contentful
          </h2>

          <PrimaryButton
            text="Go to Contentful"
            link={CONTENTFUL_LINK as string}
            className="flex items-center justify-center gap-2 !px-10 text-center"
          />
        </div>
      )}
    </>
  )
}

export default ContentPage
