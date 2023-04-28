import type { FC } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useCallback } from 'react'

import { api } from '../../utils/api'

const NewUserPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const mutation = api.user.firstLogin.useMutation({
    retry: false,
    onSuccess: () => void push('/admin'),
  })

  const handleFirstLogin = (userId: string, email: string) => {
    mutation.mutate({ userId: userId, email: email })
  }

  // If unauthenticated, redirect to error page
  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  // If authenticated, update user information
  useEffect(() => {
    if (session) {
      handleFirstLogin(session.user.id, session.user.email as string)
    }
  }, [session])

  return (
    <>
      {session && (
        <div className="flex h-full flex-col items-center justify-center p-20 font-klima">
          <p className="font-bold">Welcome to TORIIS Portal!</p>
          <p className="py-10">
            Redirecting you to{' '}
            <Link
              href="/admin"
              className="cursor-pointer text-cobalt underline"
            >
              Administration Control
            </Link>
            ...
          </p>
        </div>
      )}
    </>
  )
}

export default NewUserPage
