import type { FC } from 'react'

import data from '../info/instDivestment.json'

interface Pair {
  text: string
  link: string
}
const links: Pair[] = data.links as Pair[]

const LinkDisplay: FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-md bg-darkTeal py-12 px-12 text-white">
      <h1>Institutional Divestment Links</h1>

      <div className="flex flex-wrap justify-center  text-sm leading-loose underline ">
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
