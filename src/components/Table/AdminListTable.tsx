import type { FC } from "react";
import type { User } from "@prisma/client";
import { Checkbox } from "flowbite-react";
import clsx from "clsx";
import {
    TrashIcon,
    ArrowUturnLeftIcon
  } from '@heroicons/react/24/outline'

import { formatDate } from "../../utils/helpers";

interface AdminUsers {
    users: User[] | undefined
    className?: string
}

const AdminListTable:FC<AdminUsers> = ({users, className}) => {
    const edit = true;
    const recentDelete = false;

    return (
    <div className={`${className || ""} flex flex-col items-center border border-black rounded-xl h-[450px] overflow-y-scroll shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]`}>

        <div className="w-full py-12">
        <div className="flex flex-row items-center justify-center w-full">
            <div className="flex flex-row gap-1 items-center pb-4 border-b-[1px] border-darkGray pl-6 w-10/12">
                <p className="basis-1/3 text-base text-medGray">Email</p>
                <p className="basis-1/3 text-base text-medGray">Name</p>
                <p className="basis-1/6 text-base text-medGray">Date added</p>
                <p className="basis-1/6 text-base text-center text-medGray">Email List</p>
            </div>
            {edit && <div className="ml-8 w-8"></div>}
        </div>

        {users?.map((user, num) => {
            return(<div key={num} className="flex flex-row items-center justify-center w-full">
                <div className="flex flex-row gap-1 items-center pb-4 mt-4 border-b-[1px] border-darkGray pl-6 w-10/12">
                    <p className="basis-1/3 text-xl font-medium truncate">{user.email}</p>
                    <p className="basis-1/3 text-xl font-medium truncate">{user.name}</p>
                    <p className="basis-1/6 text-base text-medGray">{formatDate(user.createdAt)}</p>
                    <div className="flex flex-col items-center basis-1/6"><Checkbox className="w-6 h-6" disabled={!edit}></Checkbox></div>
                </div>
                <button onClick={undefined}>{edit && (recentDelete ? <ArrowUturnLeftIcon className="ml-8 w-6 stroke-2 h-auto"/> : <TrashIcon className="ml-8 w-6 stroke-2 h-auto"/>)}</button>
            </div>)
        })}
        </div>
    </div>
    )
}

export default AdminListTable