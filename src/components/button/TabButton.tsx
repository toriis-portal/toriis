import type { FC } from 'react'
import clsx from 'clsx'

import Tag from '../text/Tag'

interface TabButtonProps {
  text: string
  onClick: () => void
  active: boolean
}

const TabButton: FC<TabButtonProps> = ({ text, onClick, active }) => {
  const buttonWrapStyle = clsx('basis-1/2 w-[18vw] min-w-fit')
  const buttonStyle = (active: boolean) =>
    clsx('border -m-1 w-full min-w-fit', {
      'border-cobalt bg-lightBlue': active,
      'border-black bg-white': !active,
    })

  return (
    <button className={buttonWrapStyle} onClick={onClick}>
      <Tag title={text} className={buttonStyle(active)} />
    </button>
  )
}

export default TabButton
