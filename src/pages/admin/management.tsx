import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { HighlightedTitle, PrimaryButton } from '../../components'
import { api } from '../../utils/api'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const [email, setEmail] = useState<string>('')
  const mutation = api.user.addWhitelistedUser.useMutation({
    retry: false,
    onSuccess: () => {
      // void push('/admin'),
    },
  })
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    mutation.mutate({ email: email })
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])
  return (
    <div>
      {session && (
        <div>
          <h1>Administration Management</h1>
          <div className="pl-56 pt-10">
            <HighlightedTitle
              title="Invite Administrators"
              size="medium"
              color="clementine"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <div className=" mr-12 flex w-1/2 ">
                <input
                  type="text"
                  className=" w-full rounded-md border bg-white px-4 py-3"
                  placeholder="Invite Gmail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              {/* <button type="submit">
                <PrimaryButton
                text="Invite"
                link=""
                hasArrow={false}
                className="px-5 w-48 text-base py-2 font-medium"/>
            </button> */}
              <button
                type="submit"
                className="w-48 px-5 py-2 text-base font-medium"
              >
                Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminAdminPage
