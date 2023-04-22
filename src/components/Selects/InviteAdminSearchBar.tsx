import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { PrimaryButton } from '../../components'
import { api } from '../../utils/api'

const InviteAdminSearchBar: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const [email, setEmail] = useState<string>('')

  const mutation = api.user.addWhitelistedUser.useMutation({
    retry: false,
  })

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    {
      isValidEmail(email) && mutation.mutate({ email: email })
    }
  }

  const handleClick = (event?: React.SyntheticEvent) => {
    if (event) {
      handleSubmit(event)
    }
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])
  return (
    <div className="px-4">
       <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className=" mr-20 flex w-[56%] pb-10">
                <input
                type="text"
                className=" w-full rounded-md border bg-white px-4 py-4"
                placeholder="Invite Gmail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <PrimaryButton
              text="Invite"
              link=""
              hasArrow={false}
              onClick={handleClick}
              className="w-48 px-5 py-2 text-base font-medium"
            />
          </div>
        </form>
    </div>
  )
}

export default InviteAdminSearchBar