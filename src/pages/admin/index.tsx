import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { AdminNavBar } from '../../components'
import { AdminBox } from '../../components/index'

const AdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    <div>
      {session && (
        <div className="h-screen">
          <AdminNavBar />
          <div className="mt-4 flex h-5/6 flex-wrap items-center justify-around px-5">
            <AdminBox
              title="Website Management"
              link="/admin/website/data"
              description="Manage site wide contents and databases"
            />
            <AdminBox
              title="Administration Management"
              link="/admin/management"
              description="Invite new administrators, manage current admins, and manage mailing list of current admins who have the ability to approve new admins"
            />
            <AdminBox
              title="Request Management"
              link="/admin/request"
              description="View and check status of requests"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPage
