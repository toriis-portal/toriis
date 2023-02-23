import type { FC } from 'react'

import data from '../info/instDivestment.json'

interface Pair {
  text: string
  link: string
}
const links: Pair[] = data.links as Pair[]

const LinkDisplay: FC = () => {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center rounded-md bg-darkTeal px-10 pt-6 pb-16 text-white">
      <div className="relative -top-12 z-10 rounded-full border-2 border-colbalt bg-white px-8 py-2 shadow-cobalt">
        <h1 className="text-lg font-semibold text-darkTeal ">
          Institutional Divestment Links
        </h1>
      </div>
      <div className="flex flex-wrap  justify-center text-sm leading-loose underline">
        {links.map((pair: Pair, index: number) => (
          <a
            href={pair.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="mx-2"
          >
            {pair.text}
          </a>
        ))}
      </div>
    </div>
  )
}

export default LinkDisplay
