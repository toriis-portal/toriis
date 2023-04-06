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
    const ids = ['642f50d01c844879937b9c69', '642f50e81c844879937b9c70'] // = ['lizatest1', 'lizatest2']
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

        {mutation.error ? (
          <p>Something went wrong! {mutation.error.message}</p>
        ) : (
          <p>Successful deletion</p>
        )}
      </div>
    )
  )
}

export default AdminAdminPage
