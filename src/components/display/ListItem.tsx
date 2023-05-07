import type { FC } from 'react'

import NumberCircle from '../text/NumberCircle'

interface ListItemProps {
  listVal: number
  listContent: string
}

const ListItem: FC<ListItemProps> = ({ listVal, listContent }) => {
  return (
    <>
      <div className="flex w-full items-center space-x-8">
        <NumberCircle val={listVal} />
        <p className="header-3">{listContent}</p>
      </div>
    </>
  )
}

export default ListItem
