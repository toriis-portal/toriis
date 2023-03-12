import type { FC } from 'react'

interface TagProps {
  assetsum: number
}

const NetAssetTag: FC<TagProps> = ({ assetsum }) => {
  let modSum = ''
  let letter = ''
  if (assetsum > 1000000000) {
    letter = 'b'
    modSum = (assetsum / 1000000000).toString().substring(0, 4)
  } else if (assetsum > 1000000) {
    letter = 'm'
    modSum = (assetsum / 1000000).toString().substring(0, 4)
  } else if (assetsum > 1000) {
    letter = 'k'
    modSum = (assetsum / 1000).toString().substring(0, 4)
  } else {
    modSum = assetsum.toString().substring(0, 4)
  }
  modSum = modSum.charAt(3) === '.' ? modSum.slice(0, 3) : modSum
  return (
    <div className="flex max-w-fit flex-col items-center gap-2 rounded-xl bg-lightBlue px-4 py-2">
      <div className="flex text-center text-lg font-medium">
        {'net asset sum'}
      </div>
      <div className="flex pb-1 text-[28px] font-medium text-cobalt">
        {modSum}
        {letter}
      </div>
    </div>
  )
}

export default NetAssetTag
