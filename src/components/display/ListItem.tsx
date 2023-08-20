import type { FC } from 'react'

import NumberCircle from '../text/NumberCircle'

interface ListItemProps {
  listIndex: number
  listContent: string | React.ReactNode
}

const ListItem: FC<ListItemProps> = ({ listIndex, listContent }) => {
  return (
    <div className="flex w-full items-center space-x-8">
      <NumberCircle val={listIndex} />
      <div className="header-3">{listContent}</div>
    </div>
  )
}

export default ListItem
