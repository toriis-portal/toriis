import type { FC } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

import data from '../info/home.json'

interface Pair {
  text: string
  link: string
}
const links = (data.instDivestment as { links: Pair[] }).links

const LinkDisplay: FC = () => {
  return (
    <div className="mt-12 flex w-full flex-col items-center rounded-md bg-darkTeal px-6 pt-6 pb-16 text-white">
      <div className="relative -top-12 z-10 rounded-full border-2 border-colbalt bg-white px-16 py-2 shadow-cobalt">
        <p className="text-3xl text-darkTeal ">
          Institutional Divestment Links
        </p>
      </div>
      <div className="flex flex-wrap justify-center leading-loose underline">
        {links.map((pair: Pair, index: number) => (
          <div key={index} className="mx-2 inline-block">
            <Link href={pair.link} target="_blank" rel="noopener noreferrer">
              {pair.text}
            </Link>
            <ArrowUpRightIcon className="ml-2 inline h-4 w-4 text-white" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LinkDisplay
