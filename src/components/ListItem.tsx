import type { FC } from 'react'

import NumberCircle from './NumberCircle'

interface ListItemProps {
  listVal: string
  listContent: string
}

const ListItem: FC<ListItemProps> = ({ listVal, listContent }) => {
  return (
    <>
      <div className="my-3 ml-6 flex items-center">
        <div className="flex h-16 items-center">
          <NumberCircle val={listVal} />
        </div>

        <div className="ml-10 font-klima text-xl font-bold text-black">
          <p>{listContent}</p>
        </div>
      </div>
    </>
  )
}

export default ListItem
