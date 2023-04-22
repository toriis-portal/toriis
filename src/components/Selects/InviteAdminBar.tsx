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
    !isValidEmail(email) && alert('Please enter a valid email')
    isValidEmail(email) && mutation.mutate({ email: email })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="mr-10 lg:mr-20 flex w-full">
        <input
          type="email"
          className="w-full rounded-md border bg-white px-4 py-4"
          placeholder="Invite Gmail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <PrimaryButton
        text="Invite"
        link=""
        type="submit"
        hasArrow={false}
        className="w-48 px-5 py-2 text-base font-medium"
      />
    </form>
  )
}

export default InviteAdminBar