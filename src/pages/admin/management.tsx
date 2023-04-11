import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { AdminListTable } from '../../components'
import { api } from '../../utils/api'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  const deleteUsersMutation = api.user.deleteManyUsers.useMutation()

  const handleDeleteUsers = () => {
    const ids: string[] = []
    deleteUsersMutation.mutate({ ids })
  }

  const { data } = api.user.getAllUsers.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    session && (
      <div>
        <h1>Administration Management</h1>
        <AdminListTable className="w-3/4" users={data} />

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
