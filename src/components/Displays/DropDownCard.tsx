import { useState } from 'react'
import type { FC } from 'react'

import type { Props } from '../../types/ourRequest'
const DropDownCard: FC<{ item: Props }> = ({ item }) => {
  console.log('h')
  console.log(item.header)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <div className=" font-Inter">
      <div
        className={
          " ${open ? 'border-2 border-cobalt' : 'border-0'} max-w-sm rounded-lg bg-white p-6 shadow-lg md:max-w-4xl"
        }
      >
        <p className="mb-4 text-base font-medium">{item.header}</p>
        {open ? (
          <div className="text-neutral-600">
            {item.body}
            <br />
          </div>
        ) : null}
        <br />
        <div className="flex">
          <button
            className=" ml-auto rounded-2xl bg-clementine px-3 py-1 text-sm italic"
            onClick={handleOpen}
          >
            {open ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default DropDownCard
