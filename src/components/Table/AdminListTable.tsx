import type { FC } from "react";
import type { User } from "@prisma/client";
import { Checkbox } from "flowbite-react";

interface AdminUsers {
    users: User[] | undefined
}

const AdminListTable:FC<AdminUsers> = ({users}) => {
    return (
    <div className="flex flex-col w-1/2 m-40">
        <div className="font-klima text-sm text-darkGray">email</div>
        {users?.map((user, num) => {
            return(<div key={num} className="flex flex-row border-t-[1px] border-darkGray align-middle">
                <p className="flex basis-1/3 font-medium">{user.email}</p>
                <p className="flex basis-1/3 font-medium">{user.name}</p>
                <p className="flex basis-1/6">{user.createdAt.getMonth()}/{user.createdAt.getDate()}/{user.createdAt.getFullYear()}</p>
                <Checkbox className=""></Checkbox>
            </div>)
        })}
    </div>
    )
}

export default AdminListTable