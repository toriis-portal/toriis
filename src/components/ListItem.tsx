import type { FC } from 'react'

import NumberCircle from './NumberCircle'

interface props {
  listVal: string
  listContent: string
}

// ListItem should be placed inside of a <table> element,
// no need to wrap ListItem in a <tr> element, as the component wraps the data automatically
const ListItem: FC<props> = ({ listVal, listContent }) => {
  return (
    <>
      <tr className="mt-4 ml-6 flex items-center">
        <td className="h-16">
          <NumberCircle val={listVal} />
        </td>

        <td className="ml-10 text-xl font-bold text-black">
          <p>{listContent}</p>
        </td>
      </tr>
    </>
  )
}

export default ListItem
