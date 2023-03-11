import type { FC } from 'react'
import type { Sector } from '@prisma/client'

import Tag from '../../components/Text/Tag'
import NetAssetTag from '../../components/Card/NetAssetTag'
import ESGTag from '../../components/Card/ESGTag'

interface CardProps {
    input: 
        { ESG: { environment_grade: string; }[]; } & { id: string; name: string; ticker: string; sector: Sector | null; industry: string | null; netAssetSum: number; description: string | null; } | undefined
}

const CompanyCard: FC<CardProps> = ({ input }) => {
  return (
    <div className="flex flex-col gap-[30px] rounded-xl border-[0.5px] border-darkTeal bg-white px-[40px] pt-[30px] pb-[20px]">
      <div className="flex flex-row justify-between text-[28px] font-medium text-black">
        {input?.name}
        <Tag title="environmental grade" />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="justify-betwen flex h-fit flex-row items-start gap-[20px]">
          {input?.netAssetSum ? <NetAssetTag assetsum={input?.netAssetSum}/> : <></>}
          <div className="ml-[10px] flex flex-col justify-between self-stretch">
            <Tag title="sector" />
            <Tag title="industry" />
          </div>
          <div className="flex flex-col justify-between self-stretch">
            <p>{input?.sector ? formatSector(input?.sector) : ""}</p>
            <p>{input?.industry}</p>
          </div>
        </div>
        <ESGTag grade={input?.ESG[0]?.environment_grade}/>
      </div>
    </div>
  )
}

const formatSector = (input: string) =>
{
    const formatted = input.replaceAll('_',' ')
    return formatted.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        }
      );
}

export default CompanyCard
