import type { FC } from 'react'
import type { User } from '@prisma/client'
import { Checkbox } from 'flowbite-react'
import clsx from 'clsx'
import { TrashIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

import { formatDate } from '../../utils/helpers'

interface AdminUsers {
  users: User[] | undefined
  edit: boolean
  onTrash: (id: string) => void
  onUndo: (id: string) => void
  tempDeleted: string[]
  className?: string
}

const AdminListTable: FC<AdminUsers> = ({ users, className, edit, onTrash, onUndo, tempDeleted }) => {

  return (
    <div
      className={`${
        className || ''
      } flex h-[450px] flex-col items-center overflow-y-scroll rounded-xl border border-black shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]`}
    >
      <div className="w-full py-12">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="flex w-10/12 flex-row items-center gap-1 border-b-[1px] border-darkGray pb-4 pl-6">
            <p className="basis-1/3 text-base text-medGray">Email</p>
            <p className="basis-1/3 text-base text-medGray">Name</p>
            <p className="basis-1/6 text-base text-medGray">Date added</p>
            <p className="basis-1/6 text-center text-base text-medGray">
              Email List
            </p>
          </div>
          {edit && <div className="ml-8 w-8"></div>}
        </div>

        {users?.map((user, num) => {
            const deletePressed = tempDeleted.indexOf(user.id) > -1
          return (
            <div
              key={num}
              className="flex w-full flex-row items-center justify-center"
            >
              <div className="mt-4 flex w-10/12 flex-row items-center gap-1 border-b-[1px] border-darkGray pb-4 pl-6">
                <p className={clsx("basis-1/3 truncate text-xl font-medium",
                deletePressed && "text-lightGray",
                !deletePressed && "text-black")}>
                  {user.email}
                </p>
                <p className={clsx("basis-1/3 truncate text-xl font-medium",
                deletePressed && "text-lightGray",
                !deletePressed && "text-black")}>
                  {user.name}
                </p>
                <p className={clsx("basis-1/6 text-base",
                deletePressed && "text-lightGray",
                !deletePressed && "text-medGray")}>
                  {formatDate(user.createdAt)}
                </p>
                <div className="flex basis-1/6 flex-col items-center">
                  <Checkbox className="h-6 w-6" disabled={!edit || deletePressed}></Checkbox>
                </div>
              </div>
              <button onClick={() => deletePressed ? onUndo(user.id) : onTrash(user.id)}>
                {edit &&
                  (deletePressed ? (
                    <ArrowUturnLeftIcon className="ml-8 h-auto w-6 stroke-2" />
                  ) : (
                    <TrashIcon className="ml-8 h-auto w-6 stroke-2" />
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
