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
      <div className="px-12">
        <div className="flex flex-col md:flex-row">
          <PrimaryButton
            text="Financed Emissions"
            onClick={() => setFlag('financedEmissions')}
            variant={
              flag === 'financedEmissions' ? 'clementine-toggled' : 'clementine'
            }
            className="z-1 relative"
          >
            {
              <ToolTip
                title={'Financed Emission'}
                details={TOOLTIP_DEFINITIONS.FINANCED_EMISSIONS}
              />
            }
          </PrimaryButton>
          <PrimaryButton
            text="Net Asset Value"
            onClick={() => setFlag('netAssetValue')}
            variant={
              flag === 'netAssetValue' ? 'clementine-toggled' : 'clementine'
            }
          >
            {
              <ToolTip
                title={'Net Asset Value'}
                details={TOOLTIP_DEFINITIONS.NET_ASSET_VAL}
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
        <div className="justify-center">
          <HighlightedTitle
            title="66,299 Metric Tons of CO2 is Equivalent to"
            size="medium"
            color="clementine"
            padded={false}
          ></HighlightedTitle>
        </div>
      </div>
    </div>
  )
}

export default UniversityInvestments
