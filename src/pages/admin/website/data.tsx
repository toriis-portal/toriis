import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'
// import ContentfulButton from '../../components/Buttons/ContentfulButton'
// const AdminWebPage: FC = () => {

const DataPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  // return (
  //   <>
  //     <div className="h-screen w-screen">
  //       {session && <h1>Website Management</h1>}
  //       <ContentfulButton />
  //     </div>
  //   </>
  // )
  return <div>{session && <h1>Update Database</h1>}</div>
}

export default DataPage
