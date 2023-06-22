import type { FC, ReactNode } from 'react'
import clsx from 'clsx'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Company, ESG } from '@prisma/client'

import { mainParagraphStyle } from '../../utils/renderer'
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
  esgExplanation: ReactNode
  className?: string
}

const CompanyTooltipGroup: FC<CompanyTooltipGroupProps> = ({
  company,
  sectorEntry,
  industryEntry,
  esgExplanation,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex max-w-full flex-wrap items-center justify-between gap-y-2 px-8 md:gap-y-4',
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
        {sectorEntry.avgGrade && (
          <ToolTip>
            <div className="body-small">
              <p>
                Average environmental grade for sector <b>{sectorEntry.name}</b>
                :
              </p>
              <Tag
                title={sectorEntry.avgGrade}
                className={clsx(
                  'text-white',
                  envGradeToColor(sectorEntry.avgGrade),
                )}
              />
              <br />
              <b>Environmental grade:</b>
              {esgExplanation}
            </div>
          </ToolTip>
        )}
      </div>
    </div>
  )
}
export default CompanyTooltipGroup
