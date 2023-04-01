import React from 'react'
import type { FC } from 'react'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

const AuthButton: FC = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  const buttonStyle = clsx(
    'bg-white border border-solid border-2 border-darkTeal text-darkTeal w-full rounded-lg py-3 my-2',
  )
  const buttonStyleInverse = clsx(
    'bg-darkTeal text-white w-full rounded-lg py-3 mt-6',
  )

  return (
    <React.Fragment>
      {session ? (
        <button
          className="h-full rounded-full bg-black p-2 text-center text-sm font-medium text-white"
          onClick={() => setOpen(!open)}
        >
          <UserIcon className="w-[2em] text-white" />
        </button>
      ) : (
        <button
          className="w-fit rounded-full bg-lightBlue px-5 py-1 text-center text-base font-medium text-black"
          onClick={() => setOpen(!open)}
        >
          admin login
        </button>
      )}
      <div
        className={clsx(
          'rounded-lg border border-black bg-white px-2 py-6 lg:px-8',
          'font-inter text-base font-normal text-black',
          'absolute right-8 top-[5.5rem] inline-block',
          'z-[100] w-[42%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)] transition-opacity duration-200',
          { 'invisible opacity-0': !open, 'visible opacity-100': open },
        )}
      >
        <div className="px-10 py-4">
          <div className="absolute right-4 top-4 text-right">
            <button onClick={() => setOpen(!open)}>
              <XMarkIcon className="w-6 text-black" />
            </button>
          </div>
          {session ? (
            <div>
              <button className={buttonStyle}>Manage Website</button>
              <button className={buttonStyle}>Manage Administration</button>
              <button
                onClick={() => void signOut()}
                className={buttonStyleInverse}
              >
                Log out
              </button>
            </div>
          ) : (
            <div>
              <button
                className={buttonStyle}
                onClick={() => void signIn('google', { callbackUrl: '/admin' })}
              >
                Continue with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default AuthButton
