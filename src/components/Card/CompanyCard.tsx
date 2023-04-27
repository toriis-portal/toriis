import type { FC } from 'react'
import type { Company, EnvGrade } from '@prisma/client'
import Link from 'next/link'
import clsx from 'clsx'

import { sectorEnum } from '../../utils/enums'
import { Tag, NetAssetTag, ESGTag } from '../'

export interface CardProps {
  companyInfo: { ESG: EnvGrade | undefined } & { company: Company }
}

const CompanyCard: FC<CardProps> = ({ companyInfo }) => {
  return (
    <Link href={`/company/${companyInfo.company.id}`}>
      <div
        className={clsx(
          'flex flex-col gap-[1.5vw] rounded-xl bg-white px-[2.6vw] pt-[2vw] pb-[1.3vw]',
          'border-[0.5px] border-darkTeal shadow-[0_4px_4px_0] shadow-lightShadow',
          'hover:-m-[3.2px] hover:border-4 hover:border-cobalt',
          'overflow-x-scroll',
          'md:overflow-hidden',
        )}
      >
        <div className="flex flex-row justify-between text-black">
          <p className="header-3 font-semibold">{companyInfo.company.name}</p>
          <Tag
            title="environmental grade"
            className=" bg-lightBlue text-black"
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex h-fit flex-row gap-[20px]">
            <NetAssetTag assetsum={companyInfo.company.netAssetVal} />
            <div className="mr-2 grid grid-cols-[100px_1fr] grid-rows-[auto_1fr_auto] gap-x-5 gap-y-1">
              <div className="col-span-1 col-start-1 row-span-1 row-start-1 self-center">
                <Tag title="sector" className="bg-lightBlue text-black" />
              </div>
              <p className=" col-span-1 col-start-2 row-span-1 row-start-1">
                {companyInfo.company.sector
                  ? sectorEnum[companyInfo.company.sector]
                  : 'None specified'}
              </p>
              <div className="col-span-1 col-start-1 row-span-1 row-start-3 self-center">
                <Tag title="industry" className=" bg-lightBlue text-black" />
              </div>
              <p className=" text-wrap col-span-1 col-start-2 row-span-1 row-start-3">
                {companyInfo.company.industry
                  ? companyInfo.company.industry
                  : 'None specified'}
              </p>
            </div>
          </div>
          <ESGTag grade={companyInfo.ESG} />
        </div>
      </div>
    </Link>
  )
}
export default CompanyCard
