import Link from 'next/link'
import type { FC } from 'react'
import { signIn } from 'next-auth/react'
import clsx from 'clsx'

const AuthErrorPage: FC = () => {
  const linkStyle = clsx('text-cobalt underline cursor-pointer')

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 py-20 font-klima">
      <p className="font-bold">
        Sorry, you do not have permission to login as an administrator.
      </p>
      <p>
        Please check your email and{' '}
        <span
          className={linkStyle}
          onClick={() => void signIn('google', { callbackUrl: '/admin' })}
        >
          try again
        </span>
        , or{' '}
        <Link className={linkStyle} href="/home">
          go back to the main page
        </Link>
        .
      </p>
    </div>
  )
}

export default AuthErrorPage
