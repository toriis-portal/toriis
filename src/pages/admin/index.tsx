import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

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
      {session && <h1>Administration Controls</h1>
      }
      <div className = "flexbox mb-2 items-center">
        <div>
        <AdminBox title="Administration Management" description="Invite new administrators, manage current admins, and manage mailing list of current admins who have the ability to approve new admins" />
        </div>
        <div>
        <AdminBox title="Administration Management" description="Invite new administrators, manage current admins, and manage mailing list of current admins who have the ability to approve new admins" />
        </div>
        <div>
        <AdminBox title="Administration Management" description="Invite new administrators, manage current admins, and manage mailing list of current admins who have the ability to approve new admins" />
        </div>
        </div>
      
    </div>
    )
}

export default AdminPage
