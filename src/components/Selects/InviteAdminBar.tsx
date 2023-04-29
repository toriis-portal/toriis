import type { FC } from 'react'
import { useState } from 'react'

import { PrimaryButton } from '..'
import { api } from '../../utils/api'

const InviteAdminBar: FC = () => {
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const [email, setEmail] = useState<string>('')

  const mutation = api.user.addWhitelistedUser.useMutation({
    retry: false,
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
          hasArrow={false}
          className="body-normal w-48 px-5 py-2"
        />
      </form>
      <div className="mt-2 text-medGray">
        {mutation.isSuccess && 'succesfully invited new administator!'}
        {mutation.isError && 'failed to invite new administator!'}
      </div>
    </>
  )
}

export default InviteAdminBar
