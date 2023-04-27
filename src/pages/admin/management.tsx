import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import {
  AdminListTable,
  HighlightedTitle,
  PrimaryButton,
  Tag,
  InviteAdminBar,
} from '../../components'
import { api } from '../../utils/api'
import { AdminNavBar } from '../../components'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  const [usersToDelete, setUsersToDelete] = useState<string[]>([])
  const [usersEmailUpdate, setUsersEmailUpdate] = useState<string[]>([])
  const [edit, setEdit] = useState(false)

  const deleteUsersMutation = api.user.deleteManyUsers.useMutation({
    async onSuccess() {
      setUsersToDelete([])
      await refetch()
    },
  })

  const updateEmailsMutation = api.user.updateUserEmailPreference.useMutation({
    async onSuccess() {
      setUsersEmailUpdate([])
      await refetch()
    },
  })

  const handleEdit = () => {
    if (edit) {
      setUsersToDelete([])
      setUsersEmailUpdate([])
    }
    setEdit(!edit)
  }

  const handleUpdateUsers = () => {
    updateEmailsMutation.mutate({ ids: usersEmailUpdate })
    deleteUsersMutation.mutate({ ids: usersToDelete })
    setEdit(false)
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
      <>
        <AdminNavBar />
        <div className="flex flex-col items-center gap-5 first-letter:w-full">
          <div className="mt-20 flex w-3/4 flex-row justify-between">
            <div className="-mb-[12px] flex flex-row items-start justify-start gap-1">
              <HighlightedTitle
                title="Administrative List"
                size="medium"
                color="clementine"
              />
              <p className="ml-2 mt-3.5 text-medGray">
                {`(${data?.length || 0} Results)`}
              </p>
            </div>
            <button className="self-end" onClick={handleEdit}>
              {edit ? (
                <Tag
                  title="edit"
                  className="border border-black bg-black font-normal text-white"
                />
              ) : (
                <u>
                  <Tag
                    title="edit"
                    className="border border-black bg-lightBlue font-normal text-black"
                  />
                </u>
              )}
            </button>
          </div>
          <AdminListTable
            className="w-3/4"
            users={data}
            editEnabled={edit}
            onTrash={(currentId) => {
              setUsersToDelete([...usersToDelete, currentId])
            }}
            onUndo={(currentId) => {
              setUsersToDelete(usersToDelete.filter((id) => id !== currentId))
            }}
            onCheck={(currentId) => {
              setUsersEmailUpdate(
                !usersEmailUpdate.includes(currentId)
                  ? [...usersEmailUpdate, currentId]
                  : usersEmailUpdate.filter((id) => id !== currentId),
              )
            }}
            tempDeleted={usersToDelete}
            tempChecked={usersEmailUpdate}
          />
          <div className="mb-4">
            {!deleteUsersMutation.isLoading &&
              !updateEmailsMutation.isLoading &&
              edit && (
                <PrimaryButton text="Update" onClick={handleUpdateUsers} />
              )}
          </div>

          {deleteUsersMutation.error && (
            <p>Something went wrong! {deleteUsersMutation.error.message}</p>
          )}
          {updateEmailsMutation.error && (
            <p>Something went wrong! {updateEmailsMutation.error.message}</p>
          )}

          <div className="mb-20 w-3/4">
            <div className="-mb-[12px] flex flex-row items-start justify-start">
              <HighlightedTitle
                title="Invite Administrators"
                size="medium"
                color="clementine"
              />
            </div>
            <InviteAdminBar />
          </div>
        </div>
      </>
    )
  )
}

export default AdminAdminPage
