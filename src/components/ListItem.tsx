import type { FC } from 'react'

import NumberCircle from './NumberCircle'

interface ListItemProps {
  listVal: string
  listContent: string
}

// ListItem should be placed inside of a <table> element,
// no need to wrap ListItem in a <tr> element, as the component wraps the data automatically
const ListItem: FC<ListItemProps> = ({ listVal, listContent }) => {
  return (
    <>
      <tr className="my-3 flex items-center">
        <td className="flex h-16 items-center">
          <NumberCircle val={listVal} />
        </td>

        <td className="ml-10 font-klima text-xl font-bold text-black">
          <p>{listContent}</p>
        </td>
      </tr>
    </>
  )
}

export default ListItem
