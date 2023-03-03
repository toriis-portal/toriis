import { useState } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

import type { Props } from '../../types/ourRequest'
import NumberCircle from '../Text/NumberCircle'

const DropDownCard: FC<{ item: Props; index: number }> = ({ item, index }) => {
  console.log('h')
  console.log(item.header)
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  // <div className="flex w-full items-center space-x-8">

  return (
    <div className=" font-Inter items-center">
      <div
        className={clsx(
          'content-center rounded-xl bg-white shadow-lg md:w-[1250px]',
          { 'border-4 border-cobalt': open },
        )}
      >
        <div className="flex w-full items-center space-x-8 pr-24 pl-24  pt-6 ">
          <NumberCircle val={index} />
          <p className="mb-4 inline pt-6 text-base  font-[560]">
            {item.header}
          </p>
        </div>
        {open ? (
          <div className="border-t-2 border-cobalt p-6 font-[400] text-neutral-600 ">
            {item.body}
            <ol className="list-[lower-alpha] pl-12 pr-4">
              {item.list.map((bullet) => (
                <li key={index}> {bullet} </li>
              ))}
            </ol>
            <ol className="list-[lower-roman] pl-24 pr-4">
              {item.sublist.map((bullet) => (
                <li key={index}> {bullet} </li>
              ))}
            </ol>
          </div>
        ) : null}
        <div className="flex pb-6 pr-6">
          <button
            className="ml-auto rounded-2xl bg-clementine px-3 py-1 text-sm italic"
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
