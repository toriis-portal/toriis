import type { FC } from 'react'

import NumberCircle from './NumberCircle'

interface ListItemProps {
  listVal: string
  listContent: string
}

const ListItem: FC<ListItemProps> = ({ listVal, listContent }) => {
  return (
    <>
      <div className="flex w-full items-center space-x-8">
        <NumberCircle val={listVal} />
        <p className="font-klima text-[22px] font-[559] text-black">
          {listContent}
        </p>
      </div>
    </>
  )
}

export default ListItem
