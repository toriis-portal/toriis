import type { FC } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

import HomeData from '../../info/home.json'
import ShadowTitle from '../../components/Text/ShadowTitle'

interface LinkTextPair {
  text: string
  link: string
}
const links = HomeData.instDivestment.links

const LinkDisplay: FC = () => {
  return (
    <div className="mt-14 flex w-full flex-col items-center rounded-xl bg-darkTeal px-6 pt-6 pb-16 text-white">
      <div className="relative -top-12 ">
        <ShadowTitle text="Institutional Divestment Links" />
      </div>
      <div className="flex flex-wrap justify-center leading-loose underline">
        {links.map((pair: LinkTextPair, index: number) => (
          <div key={index} className="mx-2 inline-block">
            <Link href={pair.link} target="_blank" rel="noopener noreferrer">
              {pair.text}
            </Link>
            <ArrowUpRightIcon className="ml-2 inline h-4 w-4 stroke-current stroke-1 text-white" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LinkDisplay
