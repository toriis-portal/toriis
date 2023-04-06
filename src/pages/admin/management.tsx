import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { api } from '../../utils/api'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  const mutation = api.user.deleteManyUsers.useMutation() // TODO: check about options here

  const handleDeleteUsers = () => {
    const ids = ['642f52c92767e2315fce2fd6', '642f52ec2767e2315fce2fda'] // = ['lizatest1']
    mutation.mutate({ ids })
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    session && (
      <div>
        <h1>Administration Management</h1>

        <button onClick={handleDeleteUsers} disabled={mutation.isLoading}>
          boom boom
        </button>

        {mutation.error && (
          <p>Something went wrong! {mutation.error.message}</p>
        )}
      </div>
    )
  )
}

export default AdminAdminPage
