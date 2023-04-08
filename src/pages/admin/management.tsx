import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'
import { Checkbox } from 'flowbite-react'

import { api } from '../../utils/api'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const {data} = api.user.getAllUsers.useQuery(undefined, {
    refetchOnWindowFocus: false,
  })

  console.log(data)

  return <>
  <div>{session && <h1>Administration Management</h1>}
  <div className="flex flex-col w-1/2 m-40">
    <div className="font-klima text-sm text-darkGray">email</div>
  {data?.map((user, num) => {
    return(<div key={num} className="flex flex-row border-t-[1px] border-darkGray align-middle">
      <p className="flex basis-1/3 font-medium">{user.email}</p>
      <p className="flex basis-1/3 font-medium">{user.name} + "aaaaaaaaaaaaaaaaaaaaaaaaaaaa"</p>
      <p className="flex basis-1/6">{user.createdAt.getMonth()}/{user.createdAt.getDate()}/{user.createdAt.getFullYear()}</p>
      <Checkbox className=""></Checkbox>
    </div>)
  })}</div></div>
  </>
}

export default AdminAdminPage
