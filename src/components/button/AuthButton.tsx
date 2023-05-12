import React from 'react'
import type { FC } from 'react'
import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import GoogleLogin from '../../../public/google.png'

const AuthButton: FC = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const buttonStyle = clsx(
    'bg-white border border-solid border-2 border-darkTeal text-darkTeal w-full rounded-lg py-3 px-1 my-2',
  )
  const buttonStyleInverse = clsx(
    'bg-darkTeal text-white w-full rounded-lg py-3 mt-6',
  )

  return (
    <React.Fragment>
      {session ? (
        <button
          className="flex aspect-square items-center justify-center rounded-full bg-black p-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserIcon className="w-[1.6em] text-white" />
        </button>
      ) : (
        <button
          className="w-fit rounded-full bg-lightBlue px-5 py-1 text-center text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          admin login
        </button>
      )}
      <div
        className={clsx(
          'rounded-lg border border-black bg-white py-6 px-2 lg:px-2',
          'body-normal text-black',
          'absolute right-8 top-[5.5rem] inline-block',
          'z-[100] w-[40%] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.3)] transition-opacity duration-200 lg:w-[28%]',
          { 'invisible opacity-0': !isOpen, 'visible opacity-100': isOpen },
        )}
      >
        <div className="px-4 py-4 lg:px-10">
          <div className="absolute right-4 top-4 text-right">
            <button onClick={() => setIsOpen(!isOpen)}>
              <XMarkIcon className="w-6 text-black" />
            </button>
          </div>
          {session ? (
            <div>
              <Link href="/admin/website">
                <button className={buttonStyle}>Website Management</button>
              </Link>
              <Link href="/admin/management">
                <button className={buttonStyle}>
                  Administrative Management
                </button>
              </Link>
              <Link href="/admin/request">
                <button className={buttonStyle}>Request Management</button>
              </Link>
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
                className={clsx(
                  buttonStyle,
                  'flex flex-row items-center justify-center',
                )}
                onClick={() => void signIn('google', { callbackUrl: '/admin' })}
              >
                <Image
                  src={GoogleLogin as HTMLImageElement}
                  alt="google login"
                  className="mr-3 h-4 w-4"
                />
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
