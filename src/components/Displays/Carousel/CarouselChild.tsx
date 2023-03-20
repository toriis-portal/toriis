import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { FC } from 'react'
import React from 'react'

import type { RefuteResponseEntry } from '../../../types'

const CarouselChild: FC<{ childData: RefuteResponseEntry }> = ({
  childData,
}) => {
  return (
    <div className="inline-flex leading-snug" style={{ width: '100%' }}>
      {documentToReactComponents(childData.details)}
    </div>
  )
}

export default CarouselChild
