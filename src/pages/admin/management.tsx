import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect } from 'react'

import { HighlightedTitle,
PrimaryButton} from '../../components'

const AdminAdminPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    <div>
    {session && 
      <div>
        <h1>Administration Management</h1>
        <div className = "pl-56 pt-10">
        <HighlightedTitle 
        title="Invite Administrators"
        size="medium"
        color="clementine"/>
        </div>
        <div className="flex justify-center">
            <div className=" w-1/2 flex mr-12 ">
                <input
                    type="text"
                    className=" px-4 py-3 w-full bg-white border rounded-md"
                    placeholder="Invite Gmail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>

                <PrimaryButton
                text="Invite"
                link="/fossil-fuel"
                hasArrow={false}
                className="px-5 w-48 text-base py-2 font-medium"/>
        </div>

        
      </div>}
    </div>
    )
}

export default AdminAdminPage
