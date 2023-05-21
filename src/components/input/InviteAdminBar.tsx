import type { FC } from 'react'
import { useState } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'

import { PrimaryButton, Toast } from '..'
import { api } from '../../utils/api'

interface InviteAdminBarProps {
  refetch: () => Promise<UseQueryResult>
}

const InviteAdminBar: FC<InviteAdminBarProps> = ({ refetch }) => {
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const [email, setEmail] = useState<string>('')

  const mutation = api.user.addWhitelistedUser.useMutation({
    retry: false,
    async onSuccess() {
      setEmail('')
      await refetch()
    },
  })

  const handleSubmit = (event?: React.SyntheticEvent) => {
    event && event.preventDefault()
    isValidEmail(email) && mutation.mutate({ email: email })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full justify-center">
        <div className="mr-10 flex w-full lg:mr-20">
          <input
            type="email"
            className="w-full rounded-md border bg-white p-4"
            placeholder="Invite Gmail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <PrimaryButton
          text="Invite"
          type="submit"
          className="body-normal w-48 px-5 py-2"
        />
      </form>
      {mutation.isSuccess && (
        <Toast
          type="success"
          message="Successfully invited a new administrator!"
        />
      )}
      {mutation.isError && (
        <Toast type="error" message="Failed to invite a new administrator!" />
      )}
    </>
  )
}

export default InviteAdminBar
