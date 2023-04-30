import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import {
  AdminNavBar,
  PrimaryButton,
  SubmitRequestModal,
} from '../../../components'

const UpdateData: FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  return (
    session && (
      <div>
        <AdminNavBar />
        <SubmitRequestModal
          isOpen={modalOpen}
          isOpenCallBack={setModalOpen}
          onSubmit={() => alert('Submitted Request')}
        />
        <PrimaryButton
          text="Request Review"
          onClick={() => setModalOpen(true)}
        />
      </div>
    )
  )
}

export default UpdateData
