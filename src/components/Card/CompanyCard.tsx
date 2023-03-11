import type { FC } from 'react'

import Tag from '../../components/Text/Tag'
import NetAssetTag from '../../components/Card/NetAssetTag'
import ESGTag from '../../components/Card/ESGTag'

interface CardProps {
  title: string
}

const CompanyCard: FC<CardProps> = ({ title }) => {
  return (
    <div className="flex flex-col gap-[30px] rounded-xl border-[0.5px] border-darkTeal bg-white px-[40px] pt-[30px] pb-[20px]">
      <div className="flex flex-row justify-between text-[28px] font-medium text-black">
        {title}
        <Tag title="environmental grade" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="justify-betwen flex h-fit flex-row items-start gap-[20px]">
          <NetAssetTag assetsum={500000} />
          <div className="ml-[10px] flex flex-col justify-between self-stretch">
            <Tag title="sector" />
            <Tag title="industry" />
          </div>
          <div className="flex flex-col justify-between self-stretch">
            <p>industrials</p>
            <p>bank diversity</p>
          </div>
        </div>
        <ESGTag grade="CC" />
      </div>
    </div>
  )
}

export default CompanyCard
