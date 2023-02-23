import type { FC } from 'react'

import data from '../info/instDivestment.json'

interface Pair {
  text: string
  link: string
}
const links: Pair[] = data.links as Pair[]

const LinkDisplay: FC = () => {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center rounded-md bg-darkTeal px-10 pt-8 pb-16 text-white">
      <div className="z-10 -mt-14 rounded-full border-2 border-colbalt bg-white px-8 py-2">
        <h1 className="text-lg font-semibold text-darkTeal">
          Institutional Divestment Links
        </h1>
      </div>
      <div className="relative -top-10 -left-2 rounded-full border-2 border-colbalt bg-colbalt px-8 py-2">
        <h1 className="text-lg font-semibold text-colbalt">
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
