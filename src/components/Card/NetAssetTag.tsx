import type { FC } from 'react'

import { assetAmountToString } from '../../utils/helpers'

interface TagProps {
  assetsum: number
}

const NetAssetTag: FC<TagProps> = ({ assetsum }) => {
  return (
    <div className="flex min-w-[150px] max-w-fit flex-col items-center justify-center gap-2 rounded-xl bg-lightBlue px-4 py-2">
      <div className="flex text-center text-lg font-medium">
        {'net asset sum'}
      </div>
      <div className="flex pb-1 text-[28px] font-medium text-cobalt">
        {assetAmountToString(assetsum)}
      </div>
    </div>
  )
}

export default NetAssetTag
