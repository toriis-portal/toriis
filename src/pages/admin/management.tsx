import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { api } from '../../utils/api'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  const deleteUsersMutation = api.user.deleteManyUsers.useMutation()

  const handleDeleteUsers = () => {
    const ids: string[] = []
    deleteUsersMutation.mutate({ ids })
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

        <button
          onClick={handleDeleteUsers}
          disabled={deleteUsersMutation.isLoading}
        >
          boom boom
        </button>

        {deleteUsersMutation.error && (
          <p>Something went wrong! {deleteUsersMutation.error.message}</p>
        )}
      </div>
    )
  )
}

export default AdminAdminPage
