import type { FC } from 'react'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import {
  HighlightedTitle,
  EmissionTreeMap,
  PrimaryButton,
  ToolTip,
} from '../../components'
import { TOOLTIP_DEFINITIONS } from '../../utils/constants'

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
      <div className="sm:px-12">
        <div className="flex flex-col md:flex-row">
          <PrimaryButton
            text="Financed Emissions"
            onClick={() => setFlag('financedEmissions')}
            variant={
              flag === 'financedEmissions' ? 'clementine-toggled' : 'clementine'
            }
            className="z-1 relative mb-5 w-full sm:mb-0 sm:w-fit"
          >
            {
              <ToolTip
                title="Financed Emission"
                details={TOOLTIP_DEFINITIONS.FINANCED_EMISSIONS}
                className="ml-1"
              />
            }
          </PrimaryButton>
          <PrimaryButton
            text="Net Asset Value"
            onClick={() => setFlag('netAssetValue')}
            variant={
              flag === 'netAssetValue' ? 'clementine-toggled' : 'clementine'
            }
            className="mb-5 w-full sm:mb-0 sm:w-fit"
          >
            {
              <ToolTip
                title="Net Asset Value"
                details={TOOLTIP_DEFINITIONS.NET_ASSET_VAL}
                className="ml-1"
              />
            }
          </PrimaryButton>
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
