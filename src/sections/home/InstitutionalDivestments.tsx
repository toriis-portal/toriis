import type { FC } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

import { HighlightedTitle, ListItem, ShadowTitle } from '../../components'
import type { LinkEntry } from '../../types'

const InstitutionalDivestments: FC<{ entries: LinkEntry[] }> = ({
  entries,
}) => {
  const divestmentList = [
    'Reducing exposure to financial risks from the decline of the fossil fuel industry and the carbon bubble;',
    'Being responsible financial stewards for the long-term health of both portfolios and the planet;',
    'and, revoking support from fossil fuel companies and promoting a transition to a green energy future.',
  ]

  return (
    <>
      <HighlightedTitle title="Institutional Divestment" />
      <div className="my-6 w-full px-12">
        <div className="ml-[3%] space-y-6">
          {divestmentList.map((string, index) => (
            <ListItem
              key={index + 1}
              listVal={index + 1}
              listContent={string}
            />
          ))}
        </div>
      </div>
      <div className="mt-14 flex w-full flex-col items-center rounded-xl bg-darkTeal px-6 pt-6 pb-16 text-white">
        <div className="relative -top-12 ">
          <ShadowTitle text="Institutional Divestment Links" />
        </div>
        <div className="flex flex-wrap justify-center leading-loose underline">
          {entries.map((entry, index) => (
            <div key={index} className="mx-2 inline-block">
              <Link href={entry.url} target="_blank" rel="noopener noreferrer">
                {entry.name}
              </Link>
              <ArrowUpRightIcon className="ml-2 inline h-4 w-4 stroke-current stroke-1 text-white" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default InstitutionalDivestments
