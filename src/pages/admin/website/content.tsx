import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { WebsiteManagementNavBar } from '../../../components'

const UpdateContent: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const navItems = [
    { path: '../data', text: 'Update Database', active: false },
    { path: '', text: 'Update Text Content', active: true },
  ]

  return (
    session && (
      <div>
        <WebsiteManagementNavBar navItems={navItems} />
      </div>
    )
  )
}

export default UpdateContent
