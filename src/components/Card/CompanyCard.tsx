import type { FC } from 'react'
import type { Company, EnvGrade } from '@prisma/client'

import { sectorEnum } from '../../utils/enums'
import Tag from '../../components/Text/Tag'
import NetAssetTag from '../../components/Card/NetAssetTag'
import ESGTag from '../../components/Card/ESGTag'

export interface CardProps {
  companyInfo: { ESG: EnvGrade | undefined } & { company: Company }
}

const CompanyCard: FC<CardProps> = ({ companyInfo }) => {
  return (
    <div className="flex flex-col gap-[30px] rounded-xl border-[0.5px] border-darkTeal bg-white px-[40px] pt-[30px] pb-[20px]">
      <div className="flex flex-row justify-between text-[28px] font-medium text-black">
        {companyInfo.company.name}
        <Tag
          title="environmental grade"
          backgroundColor="lightBlue"
          textColor="black"
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="justify-betwen flex h-fit flex-row items-start gap-[20px]">
          <NetAssetTag assetsum={companyInfo.company.netAssetSum} />
          <div className="ml-[10px] flex flex-col justify-between self-stretch">
            <Tag title="sector" backgroundColor="lightBlue" textColor="black" />
            <Tag
              title="industry"
              backgroundColor="lightBlue"
              textColor="black"
            />
          </div>
          <div className="flex flex-col justify-between self-stretch">
            <p>
              {companyInfo.company.sector
                ? sectorEnum[companyInfo.company.sector]
                : 'NONE'}
            </p>
            <p>{companyInfo.company.industry}</p>
          </div>
        </div>
        <ESGTag grade={companyInfo.ESG} />
      </div>
    </div>
  )
}
export default CompanyCard
