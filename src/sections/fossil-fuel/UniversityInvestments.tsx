import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import { HighlightedTitle, EmissionTreeMap } from '../../components'

interface UniversityInvestmentsProps {
  caption: Document
}
const UniversityInvestments: FC<UniversityInvestmentsProps> = ({ caption }) => {
  return (
    <div className="bg-white px-12">
      <HighlightedTitle
        title="University of Illinois Investments"
        size="large"
        color="clementine"
      />
      <div className="px-12">
        <div className="flex justify-center">
          <div className="w-3/4">
            <EmissionTreeMap />
          </div>
        </div>
        <div>{documentToReactComponents(caption, mainParagraphStyle)}</div>
      </div>
    </div>
  )
}
export default UniversityInvestments
