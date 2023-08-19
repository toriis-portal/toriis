import type { FC } from 'react'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'
import { clsx } from 'clsx'

import { mainParagraphStyle } from '../../utils/renderer'
import {
  EmissionTreeMap,
  TabButton,
  ToolTip,
  EmissionsCard,
} from '../../components'
import {
  TOOLTIP_DEFINITIONS,
  UNDERLINED_TITLE_STYLING,
} from '../../utils/constants'

const emissionsData = [
  {
    title: 'GREENHOUSE GAS EMISSIONS FROM',
    metric: '14,754',
    description: 'gasoline powered vehicles driven for one year',
    color: 'pumpkin',
    type: 'gasoline',
  },
  {
    title: 'GREENHOUSE GAS EMISSIONS AVOIDED BY',
    metric: '2,869,795',
    description: 'trashbags of waste recycled instead of landfilled',
    color: 'pumpkin',
    type: 'trashbag',
  },
  {
    title: 'CO2 EMISSIONS FROM',
    metric: '12,900',
    description: "homes' electricity use for one year",
    color: 'brightTeal',
    type: 'home',
  },
  {
    title: 'CARBON SEQUESTERED BY',
    metric: '1,096,260',
    description: 'tree seedlings grown for 10 years',
    color: 'brightTeal',
    type: 'tree',
  },
]

interface UniversityInvestmentsProps {
  flag: 'financedEmissions' | 'netAssetValue'
  caption: Document
}

const UniversityInvestments: FC<UniversityInvestmentsProps> = ({
  flag: initialFlag = 'financedEmissions',
  caption,
}) => {
  const [flag, setFlag] = useState(initialFlag)

  const TabButtonGroupStyle = clsx('flex flex-row gap-1 lg:w-1/2')

  return (
    <div className="bg-white px-12">
      <div className="flex flex-wrap justify-center py-12">
        <p className={UNDERLINED_TITLE_STYLING.PARAGRAPH}>
          UI System Investments{' '}
          <a className={UNDERLINED_TITLE_STYLING.UNDERLINE}>FY 2022</a>
        </p>
      </div>
      <div className="md:px-12">
        <div className="flex justify-center">
          <div className="w-full md:px-10 lg:px-20 xl:px-40 2xl:px-80">
            <div className="flex max-w-md flex-col justify-start gap-y-2 lg:flex-row ">
              <div className={TabButtonGroupStyle}>
                <TabButton
                  text="Financed Emissions"
                  onClick={() => setFlag('financedEmissions')}
                  active={flag == 'financedEmissions'}
                />
                <ToolTip
                  title="Financed Emissions"
                  details={TOOLTIP_DEFINITIONS.FINANCED_EMISSIONS}
                />
              </div>
              <div className={TabButtonGroupStyle}>
                <TabButton
                  text="Net Asset Value"
                  onClick={() => setFlag('netAssetValue')}
                  active={flag == 'netAssetValue'}
                />
                <ToolTip
                  title="Net Asset Value"
                  details={TOOLTIP_DEFINITIONS.NET_ASSET_VAL}
                />
              </div>
            </div>
            <div className="w-full">
              <EmissionTreeMap flag={flag} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {documentToReactComponents(caption, mainParagraphStyle)}
        </div>
        <div className="flex justify-center py-10">
          <p className="subheader-1 break-words text-center text-4xl leading-10">
            <a className={UNDERLINED_TITLE_STYLING.UNDERLINE}>
              66,299 Metric Tons of CO2
            </a>{' '}
            is Equivalent to
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid md:w-5/6 xl:grid-cols-2 xl:gap-x-12">
            {emissionsData.map((data, index) => (
              <EmissionsCard
                key={index}
                title={data.title}
                metric={data.metric}
                description={data.description}
                color={data.color}
                type={data.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversityInvestments
