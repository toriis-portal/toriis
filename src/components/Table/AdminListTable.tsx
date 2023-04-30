import type { FC } from 'react'
import type { User, WhitelistedUser } from '@prisma/client'
import { Checkbox } from 'flowbite-react'
import clsx from 'clsx'
import { TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

const delIconStyle = clsx('ml-8 h-auto w-6 stroke-2')
const delUserTextStyle = (deletePressed: boolean) =>
  clsx('basis-1/3 truncate', {
    'text-lightGray': deletePressed,
    'text-black': !deletePressed,
  })

interface AdminTableProps {
  users: (User | WhitelistedUser)[] | undefined
  editEnabled: boolean
  onTrash: (id: string) => void
  onUndo: (id: string) => void
  onCheck: (id: string) => void
  tempDeleted: string[]
  tempChecked: string[]
  className?: string
}

const AdminListTable: FC<AdminTableProps> = ({
  users,
  className,
  editEnabled,
  onTrash,
  onUndo,
  onCheck,
  tempDeleted,
  tempChecked,
}) => {
  return (
    <div
      className={clsx(
        'flex h-[450px] flex-col items-center overflow-y-auto rounded-xl border border-black shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      <div className="w-full py-12">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="body-normal flex w-10/12 flex-row items-center gap-1 border-b-[1px] border-darkGray pb-4 pl-6 text-medGray">
            <p className="basis-1/3">Email</p>
            <p className="basis-1/3">Name</p>
            <p className="basis-1/6">Date added</p>
            <p className="basis-1/6 text-center">Email List</p>
          </div>
          {editEnabled && <div className="ml-8 w-8"></div>}
        </div>

        {users?.map((user, num) => {
          const deletePressed = tempDeleted.indexOf(user.id) > -1
          const checkClicked = tempChecked.indexOf(user.id) > -1
          return (
            <div
              key={num}
              className="flex w-full flex-row items-center justify-center"
            >
              <div className="mt-4 flex w-10/12 flex-row items-center gap-1 border-b-[1px] border-darkGray pb-4 pl-6">
                <p className={delUserTextStyle(deletePressed)}>{user.email}</p>
                <p className={delUserTextStyle(deletePressed)}>
                  {(user as User).name || 'N/A'}
                </p>
                <p
                  className={clsx('body-normal basis-1/6', {
                    'text-lightGray': deletePressed,
                    'text-medGray': !deletePressed,
                  })}
                >
                  {(user as User).createdAt?.toLocaleDateString() || 'N/A'}
                </p>
                <div className="flex basis-1/6 flex-col items-center">
                  <Checkbox
                    onClick={() => onCheck(user.id)}
                    className="h-6 w-6"
                    disabled={
                      !editEnabled ||
                      deletePressed ||
                      (user as WhitelistedUser).userId !== undefined
                    }
                    checked={
                      (user as WhitelistedUser).userId === undefined &&
                      (editEnabled && checkClicked
                        ? !(user as User).shouldEmail
                        : (user as User).shouldEmail)
                    }
                  ></Checkbox>
                </div>
              </div>
              <button
                onClick={() =>
                  deletePressed ? onUndo(user.id) : onTrash(user.id)
                }
              >
                {editEnabled &&
                  (deletePressed ? (
                    <ArrowUturnLeftIcon className={delIconStyle} />
                  ) : (
                    <TrashIcon className={delIconStyle} />
                  ))}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminListTable
