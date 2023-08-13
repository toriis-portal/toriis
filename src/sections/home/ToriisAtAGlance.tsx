import type { FC } from 'react'
import React from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import clsx from 'clsx'

import {
  PrimaryButton,
  LandingDonutChart,
  HighlightedTitle,
} from '../../components'
import { mainParagraphStyle } from '../../utils/renderer'

const ToriisAtAGlance: FC<{ text: Document }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <HighlightedTitle
        title="TORIIS at a glance"
        size="large"
        color="clementine"
      />
      <div className="flex flex-col items-center justify-center px-14 py-8 lg:flex-row">
        <div className="basis-2/5">
          <LandingDonutChart />
          <div className={clsx('flex justify-center pt-2')}>
            Assets Per Sector
          </div>
        </div>
        <div className="basis-4/7">
          <div className="mb-6 p-4 lg:pr-14">
            <div className="mb-8 flex flex-col gap-6">
              {documentToReactComponents(text, mainParagraphStyle)}
            </div>
            <div className="flex flex-col gap-12 md:flex-row">
              <PrimaryButton
                text="More About Fossil Fuels"
                link="/fossil-fuel"
              />
              <PrimaryButton
                text="Learn About Investment"
                link="/investments"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToriisAtAGlance
