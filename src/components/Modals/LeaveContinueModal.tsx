import React from 'react'
import type { FC } from 'react'

import Tag from '../Text/Tag'

interface ModalProps {
  leave: () => void
  cont: () => void
}

export const LeaveContinueModal: FC<ModalProps> = ({ leave, cont }) => {
  //   const title = 'Leave Page'

  return (
    <>
      <button onClick={leave}>
        <Tag title="Leave Page" className="rounded-xl" />
      </button>
      <button onClick={leave}>
        <Tag title="Continue Editing" className="rounded-xl" />
      </button>
    </>
  )
}

export default LeaveContinueModal
