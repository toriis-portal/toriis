import type { FC } from 'react'
import Link from 'next/link'

import data from '../info/home.json'

interface Pair {
  text: string
  link: string
}
const links = (data.instDivestment as { links: Pair[] }).links

const LinkDisplay: FC = () => {
  return (
    <div className="mt-12 flex w-full flex-col items-center rounded-md bg-darkTeal px-10 pt-6 pb-16 text-white">
      <div className="relative -top-12 z-10 rounded-full border-2 border-colbalt bg-white px-16 py-2 shadow-cobalt">
        <h1 className="text-3xl text-darkTeal ">
          Institutional Divestment Links
        </h1>
      </div>
      <div className="text-lg flex flex-wrap justify-center leading-loose underline">
        {links.map((pair: Pair, index: number) => (
          <Link
            href={pair.link}
            key={index}
            // to open link in new tab:
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            {pair.text}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LinkDisplay
