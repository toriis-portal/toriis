import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { AdminListTable, HighlightedTitle, PrimaryButton, Tag } from '../../components'
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
    if(edit){
      setUsersToDelete([])
    }
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
      <div className="flex flex-col gap-5 first-letter:w-full items-center">
        <div className="flex flex-row justify-between w-3/4 mt-20">
          <div className="flex flex-row gap-1 basis-1/2 justify-start items-start -mb-[12px]">
            <HighlightedTitle title="Administrative List" size="medium" color="clementine" />
            <p className="text-medGray ml-2 mt-2.5">
                {"("}{data?.length || 0}{" Results )"}  
            </p>
          </div>
          <button className="self-end" onClick={handleEdit}>
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
        <div className="pt-6">
          {(!deleteUsersMutation.isLoading && edit) && 
            <PrimaryButton text="  Update  " onClick={handleDeleteUsers}/>}
        </div>

        {deleteUsersMutation.error && (
          <p>Something went wrong! {deleteUsersMutation.error.message}</p>
        )}
      </div>
    )
  )
}

export default AdminAdminPage
