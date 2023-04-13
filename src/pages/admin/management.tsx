import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { AdminListTable, Tag } from '../../components'
import { api } from '../../utils/api'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()


  const [usersToDelete, setUsersToDelete] = useState<string[]>([])
  const [edit, setEdit] = useState(false)

  const deleteUsersMutation = api.user.deleteManyUsers.useMutation({ async onSuccess() {
    console.log("success")
    setUsersToDelete([])
    await refetch()
    console.log("deleted")
  },})

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleDeleteUsers = () => {
    const ids: string[] = usersToDelete
    deleteUsersMutation.mutate({ ids })
  } 

  const { data, refetch } = api.user.getAllUsers.useQuery(undefined, {
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
        <div className="flex flex-row justify-between w-3/4">
          <div className="mb-8">
            admin list a billion results
          </div>
          <button className="self-end pb-2" onClick={handleEdit}>
            {edit
            ? <Tag title="edit" className="bg-black text-white border border-black font-normal"/>
            : <u><Tag title="edit" className="bg-lightBlue text-black border border-black font-normal"/></u>
            }
          </button>
        </div>
        <AdminListTable 
          className="w-3/4" 
          users={data} 
          edit={edit}
          onTrash={(currentId) => {setUsersToDelete([...usersToDelete, currentId])}}
          onUndo={(currentId) => {setUsersToDelete(usersToDelete.filter(id => id !== currentId))}}
          tempDeleted={usersToDelete}
        />
        {edit && <button
          onClick={() => {
            void handleDeleteUsers()  
          }}
          disabled={deleteUsersMutation.isLoading}
        >
          delet this
        </button>}

        {deleteUsersMutation.error && (
          <p>Something went wrong! {deleteUsersMutation.error.message}</p>
        )}
      </div>
    )
  )
}

export default AdminAdminPage
