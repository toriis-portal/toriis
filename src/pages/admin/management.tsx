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
    console.log('deleting users')
    const ids = ['642f51f32767e2315fce2fc4'] // = ['lizatest1']
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
