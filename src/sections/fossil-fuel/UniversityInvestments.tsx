import type { FC } from 'react'
import type { Asset } from 'contentful'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import {
  HighlightedTitle,
  Tag,
  EmissionTreeMap,
  PrimaryButton,
} from '../../components'

interface UniversityInvestmentsProps {
  flag: 'financedEmissions' | 'netAssetValue'
  caption: Document
}

const UniversityInvestments: FC<UniversityInvestmentsProps> = ({
  flag: initialFlag = 'financedEmissions',
  caption,
}) => {
  const [flag, setFlag] = useState(initialFlag)

  return (
    <div className="bg-white px-12">
      <HighlightedTitle
        title="University of Illinois Investments"
        size="large"
        color="clementine"
      />
      <div className="px-12">
        <div className="flex flex-col md:flex-row">
          <PrimaryButton
            text="Financed Emissions"
            onClick={() => setFlag('financedEmissions')}
            variant={
              flag === 'financedEmissions' ? 'clementine-toggled' : 'clementine'
            }
          />
          <PrimaryButton
            text="Net Asset Value"
            onClick={() => setFlag('netAssetValue')}
            variant={
              flag === 'netAssetValue' ? 'clementine-toggled' : 'clementine'
            }
          />
        </div>
        <div className="flex justify-center">
          <div className="w-3/4">
            <EmissionTreeMap flag={flag} />
          </div>
        </div>
        <div>{documentToReactComponents(caption, mainParagraphStyle)}</div>
      </div>
    </div>
  )
}

export default UniversityInvestments
