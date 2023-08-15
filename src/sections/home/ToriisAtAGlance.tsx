import type { FC } from 'react'
import React from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import clsx from 'clsx'

import { LandingDonutChart, HighlightedTitle } from '../../components'
import { mainParagraphStyle } from '../../utils/renderer'

const ToriisAtAGlance: FC<{ text: Document }> = ({ text }) => {
  return (
    <div className="mx-16 flex flex-row">
      <div className="basis-3/5">
        <HighlightedTitle
          title="TORIIS at a glance"
          size="large"
          color="clementine"
        />
        <div className="mb-8 ml-8 flex flex-col gap-6">
          {documentToReactComponents(text, mainParagraphStyle)}
        </div>
      </div>
      <div className="mt-10 ml-4 basis-2/5">
        <LandingDonutChart />
        <div className={clsx('flex justify-center pt-2')}>
          <p className="header-2">Assets Per Sector</p>
        </div>
      </div>
    </div>
  )
}

export default ToriisAtAGlance
