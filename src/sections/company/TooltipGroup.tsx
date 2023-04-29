import type { FC } from 'react'
import clsx from 'clsx'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Company, ESG } from '@prisma/client'

import { mainParagraphStyle } from '../../utils/contentfulOptions'
import { Tag, ToolTip } from '../../components'
import { envGradeToColor, assetAmountToString } from '../../utils/helpers'
import type { SectorEntry, IndustryEntry } from '../../types'

const tagGroupStyle = clsx('items-center flex-col lg:inline-flex lg:flex-row')
const noteStyle = clsx('lg:px-2 truncate my-1')
const tagStyle = clsx('bg-cobalt text-white')

interface CompanyTooltipGroupProps {
  company: Company & { ESG: ESG | null }
  sectorEntry: SectorEntry
  industryEntry: IndustryEntry
  className?: string
}

const CompanyTooltipGroup: FC<CompanyTooltipGroupProps> = ({
  company,
  sectorEntry,
  industryEntry,
  className,
}) => {
  return (
    <div
      className={clsx(
        'mx-8 flex flex-wrap items-center justify-between gap-y-4',
        className,
      )}
    >
      <div className={tagGroupStyle}>
        <Tag title="sector" className={tagStyle} />
        <div className={noteStyle}>{sectorEntry.name}</div>
        <ToolTip
          title={sectorEntry.name}
          details={
            sectorEntry.details &&
            documentToReactComponents(sectorEntry.details, mainParagraphStyle)
          }
        />
      </div>
      <div className={tagGroupStyle}>
        <Tag title="industry" className={tagStyle} />
        <div className={noteStyle}>{industryEntry.name}</div>

        <ToolTip title={industryEntry.name} details={industryEntry.details} />
      </div>
      <div className={tagGroupStyle}>
        <Tag title="net asset value" className={tagStyle} />
        <div className={noteStyle}>
          {assetAmountToString(company.netAssetVal)}
        </div>
        <ToolTip
          title="Net Asset Value"
          details={`Calculated as the sum market values for each corporate bond for ${company.name}`}
        />
      </div>
      <div className={tagGroupStyle}>
        <Tag title="environmental grade" className={tagStyle} />
        <div className={noteStyle}>
          <Tag
            title={
              company.ESG ? (company.ESG?.environmentGrade as string) : 'N/A'
            }
            className={`${envGradeToColor(
              company.ESG ? (company.ESG?.environmentGrade as string) : 'N/A',
            )} text-white`}
          />
        </div>
        <ToolTip>
          <div className="body-small">
            Average environmental grade for sector <b>Industrials</b>:
            <Tag title="CCC" className="bg-clementine text-white" />
            <br />
            <b>Environmental grade:</b> ESG refers to a set of values used to
            screen potential investments: Environmental, Social and Governance.
            An ESG score measures how sustainably a company is conducting
            business based on their environmental impact calculated from their
            carbon emissions, energy consumption and climate change action.
          </div>
        </ToolTip>
      </div>
    </div>
  )
}
export default CompanyTooltipGroup
