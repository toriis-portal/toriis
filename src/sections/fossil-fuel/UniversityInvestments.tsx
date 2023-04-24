import type { FC } from 'react'
import type { Asset } from 'contentful'
import Image from 'next/image'

import { HighlightedTitle, Tag } from '../../components'

interface UniversityInvestmentsProps {
  img: Asset
}
const UniversityInvestments: FC<UniversityInvestmentsProps> = ({ img }) => {
  console.log('Received')
  console.log(img)
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="University of Illinois Investments"
        size="large"
        color="clementine"
      />
      <div>
        <Tag
          title={img.fields.title}
          className="mb-1 w-4 rounded-md bg-clementine text-black"
        />
        {img.fields.description && <p>{img.fields.description}</p>}
        <Image
          src={'http:' + img.fields.file.url}
          alt={img.fields.title}
          width={1300}
          height={900}
        />
      </div>
    </div>
  )
}
export default UniversityInvestments
