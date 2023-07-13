import type { FC } from 'react'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import {
  HighlightedTitle,
  EmissionTreeMap,
  Toggle,
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
      <div className="px-12">
        <div className="lg:px-20">
          <div className="mb-8 flex flex-col justify-start gap-4 md:flex-row lg:gap-10">
            <Toggle
              text="Financed Emissions"
              onClick={() => setFlag('financedEmissions')}
              toggled={flag === 'financedEmissions' ? true : false}
              variant="cobalt"
            >
              {
                <ToolTip
                  title={'Financed Emission'}
                  details={TOOLTIP_DEFINITIONS.FINANCED_EMISSIONS}
                />
              }
            </Toggle>
            <Toggle
              text="Net Asset Value"
              onClick={() => setFlag('netAssetValue')}
              toggled={flag === 'netAssetValue' ? true : false}
              variant="cobalt"
            >
              {
                <ToolTip
                  title={'Net Asset Value'}
                  details={TOOLTIP_DEFINITIONS.NET_ASSET_VAL}
                />
              }
            </Toggle>
          </div>
          <div>
            <EmissionTreeMap flag={flag} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {documentToReactComponents(caption, mainParagraphStyle)}
        </div>
      </div>
    </div>
  )
}

export default UniversityInvestments
