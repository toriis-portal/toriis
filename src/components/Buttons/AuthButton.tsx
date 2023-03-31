import type { FC } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { UserIcon } from '@heroicons/react/24/solid'
import React from 'react'
import 'flowbite'
import clsx from 'clsx'

const AuthButton: FC = () => {
  const { data: session } = useSession()
  const buttonStyle = clsx(
    'bg-white border border-solid border-2 border-darkTeal text-darkTeal w-full rounded-lg py-3 mb-3',
  )
  const buttonStyleInverse = clsx(
    'bg-darkTeal text-white w-full rounded-lg py-3 mt-4',
  )

  return (
    <React.Fragment>
      {session ? (
        <button
          data-popover-target="popover-click"
          data-popover-trigger="click"
          type="button"
          className="h-full rounded-full bg-black p-1 text-center text-sm font-medium text-white"
        >
          <UserIcon className="w-[2.4em] text-white" />
        </button>
      ) : (
        <button
          data-popover-target="popover-click"
          data-popover-trigger="click"
          data-popover-offset="10"
          type="button"
          className="w-fit rounded-lg bg-lightBlue px-5 text-center text-sm font-medium text-black"
        >
          Admin Login
        </button>
      )}
      <div
        data-popover
        id="popover-click"
        role="tooltip"
        className={clsx(
          'mr-20 rounded-lg border border-black bg-white px-2 py-6 lg:px-10',
          'font-inter text-base font-normal text-black',
          'absolute right-10 inline-block',
          'invisible z-[100] w-[40%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)] transition-opacity duration-300',
        )}
      >
        <div className="px-10 py-2">
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
              <button onClick={() => void signIn('google')}>
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
