import type { FC } from 'react'

import NumberCircle from '../Text/NumberCircle'

interface ListItemProps {
  listVal: number
  listContent: string
}

const ListItem: FC<ListItemProps> = ({ listVal, listContent }) => {
  return (
    <>
      <div className="flex w-full items-center space-x-8">
        <NumberCircle val={listVal} />
        <p className="font-klima text-[22px] font-medium text-black">
          {listContent}
        </p>
      </div>
    </>
  )
}

export default ListItem
