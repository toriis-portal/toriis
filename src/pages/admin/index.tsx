import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

import {AdminBox} from '../../components/index'

const AdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  console.log(session?.user)

  return (
    <div>
      {session && (
      <div className = "h-screen">
      <h1>Administration Controls</h1>
    <div className="h-5/6 flex flex-wrap justify-around items-center px-5">
        <div className="w-auto">
        <Link href="/admin/website/data">
          <AdminBox title="Website Management" description="Manage site wide contents and databases" />
          </Link>
        </div>
        
        <div className="w-auto">
        <Link href="/admin/management">
          <AdminBox title="Administration Management" description="Invite new administrators, manage current admins, and manage mailing list of current admins who have the ability to approve new admins" />
          </Link>
        </div>
        <div className="w-auto">
          <Link href = "/admin/request">
          <AdminBox title="Request Management" description="View and check status of requests" />
          </Link>
        </div>
      </div>
    </div>
    )
  }
   </div>
    )
}

export default AdminPage
