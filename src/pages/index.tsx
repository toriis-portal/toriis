import { useSession } from 'next-auth/react'
import type { FC } from 'react'

import { AuthButton, PrimaryButton } from '../components'
import { api } from '../utils/api'

const Main: FC = () => {
  const { data, isLoading, error } = api.example.hello.useQuery({
    text: 'TORIIS Portal 🌱',
  })

  const { data: sessionData } = useSession()

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  )

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="m-2 text-4xl">{data?.greeting}</p>
      <p className="m-4 text-center">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        <br />
        {secretMessage && <span> {secretMessage}</span>}
      </p>
      <AuthButton />
    </div>
  )
}
export default Main
