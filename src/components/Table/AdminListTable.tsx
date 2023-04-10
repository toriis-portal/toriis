import type { FC } from "react";
import type { User } from "@prisma/client";
import { Checkbox } from "flowbite-react";
import clsx from "clsx";
import {
    ArchiveBoxXMarkIcon,
    ArrowUturnLeftIcon
  } from '@heroicons/react/24/outline'

import { formatDate } from "../../utils/helpers";

interface AdminUsers {
    users: User[] | undefined
}

const AdminListTable:FC<AdminUsers> = ({users}) => {
    const edit = false;
    const recentDelete = false;

    return (
    <div className="flex flex-col items-center border border-black rounded-xl w-3/4 m-20 h-40 overflow-y-scroll shadow-[inset_0_4px_0_rgba(0,0,0,0.25)]">

        <div className="font-klima text-sm text-darkGray">email</div>

        {users?.map((user, num) => {
            return(<div key={num} className="flex flex-row items-center">
                <div className="flex flex-row gap-1 items-center border-t-[1px] border-darkGray pl-6 w-10/12">
                    <p className="basis-1/3 font-medium break-words ">alexander.masgras@website.website</p>
                    <p className="basis-1/3 font-medium">Sir Alexander Michael &quot;Really Long Name&quot; Masgras MMMDCCCLXXXVIII, Esq., PhD.</p>
                    <p className="basis-1/6 text-medGray">{formatDate(user.createdAt)}</p>
                    <div className="flex flex-col items-center basis-1/6"><Checkbox className="w-6 h-6" disabled={edit}></Checkbox></div>
                </div>
                {edit && (recentDelete ? <ArrowUturnLeftIcon className="ml-8 w-8 stroke-2 h-auto"/> : <ArchiveBoxXMarkIcon className="ml-8 w-8 stroke-2 h-auto"/>)}
            </div>)
        })}
    </div>
    )
}

export default AdminListTable