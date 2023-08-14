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
  EmissionsCard,
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
        <div className="flex justify-center py-10">
          <HighlightedTitle
            title="66,299 Metric Tons of CO2 is Equivalent to"
            size="medium"
            color="clementine"
            padded={false}
          ></HighlightedTitle>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <EmissionsCard
            title="GREENHOUSE GAS EMISSIONS FROM"
            metric="14,754"
            description="gasoline powered vehicles driven for one year"
            color="clementine"
            type="gasoline"
          />
          <EmissionsCard
            title="GREENHOUSE GAS EMISSIONS AVOIDED BY"
            metric="2,869,795"
            description="trashbags of waste recycled instead of landfilled"
            color="clementine"
            type="trashbag"
          />
          <EmissionsCard
            title="CO2 EMISSIONS FROM"
            metric="12,900"
            description="homes' electricity use for one year"
            color="brightTeal"
            type="home"
          />
          <EmissionsCard
            title="CARBON SEQUESTERED BY"
            metric="1,096,260"
            description="tree seedlings grown for 10 years"
            color="brightTeal"
            type="tree"
          />
        </div>
      </div>
    </div>
  )
}

export default UniversityInvestments
