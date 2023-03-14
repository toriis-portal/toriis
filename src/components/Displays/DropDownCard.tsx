import { useState } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

import { NumberCircle, ReadMoreButton } from '../index'

interface DropDownCardProps {
  item: {
    header: string
    body: string
    list: string[]
    sublist: string[]
  }
  index: number
}

const DropDownCard: FC<DropDownCardProps> = ({ item, index }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div
      className={clsx('mb-6 ml-8 mr-20 content-center rounded-xl bg-white', {
        'border-4 border-cobalt': open,
      })}
    >
      <div
        className={clsx('flex w-full items-center space-x-8 pr-16 pl-20 pt-6', {
          'pb-10': open,
        })}
      >
        <NumberCircle val={index} />
        <p className="mb-2 inline pl-8 pt-6 text-lg font-medium">
          {item.header}
        </p>
      </div>
      {open && (
        <div className="font-Inter border-t-2 border-cobalt pl-20 pr-20 pt-6 text-base text-neutral-600">
          {item.body}
          <ol className="list-[lower-alpha] pl-12 pr-8 ">
            {item.list.map((bullet, index) => (
              <li key={index}> {bullet} </li>
            ))}
          </ol>
          <ol className="list-[lower-roman] pl-24 pr-8">
            {item.sublist.map((bullet) => (
              <li key={index}> {bullet} </li>
            ))}
          </ol>
        </div>
      )}
      <div className="flex pb-6 pr-6">
        <ReadMoreButton isOpen={open} handleOpen={handleOpen} />
      </div>
    </div>
  )
}
export default DropDownCard
