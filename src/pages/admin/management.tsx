import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { AdminListTable } from '../../components'
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
  <div>{session && <h1>Administration Management</h1>}</div>
  <AdminListTable users={data}/>
  </>
}

export default AdminAdminPage
