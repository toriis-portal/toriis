import type { FC } from 'react'
import React from 'react'
import type { Document } from '@contentful/rich-text-types'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import {
  PrimaryButton,
  LandingDonutChart,
  CapitalizedTitle,
} from '../../components'

const Landing: FC<{ text: Document }> = ({ text }) => {
  // Custom contentful render for bold text and paragraph
  const contentfulOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <span className="font-semibold underline decoration-clementine decoration-2 underline-offset-4">
          {text}
        </span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-8">{children}</p>
      ),
    },
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <CapitalizedTitle />
      <div className="flex min-w-[900px] max-w-[1600px] flex-row items-center justify-center px-14 py-10">
        <div className="basis-3/7 pr-[2em] pt-6">
          <LandingDonutChart />
        </div>
        <div className="basis-4/7">
          <div className="mb-8 pr-14">
            {documentToReactComponents(text, contentfulOptions)}
          </div>
          <div className="mt-4 flex flex-row gap-12">
            <PrimaryButton text="More About Fossil Fuels" link="/fossil-fuel" />
            <PrimaryButton text="Learn About Investment" link="/investments" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
