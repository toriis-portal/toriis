import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

const AdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  console.log(session?.user)

  //remind me to remove this link once i'm done and clear the import
  return <Link href="/admin/management">{session && <h1>Administration Control</h1>}</Link>
}

export default AdminPage
