import type { FC } from 'react'

import NumberCircle from './NumberCircle'

interface ListItemProps {
  listVal: string
  listContent: string
}

const ListItem: FC<ListItemProps> = ({ listVal, listContent }) => {
  return (
    <>
      <div className="ml-4 flex items-center space-x-4">
        <NumberCircle val={listVal} />
        <p className="font-klima text-xl font-bold text-black">{listContent}</p>
      </div>
    </>
  )
}

export default ListItem
