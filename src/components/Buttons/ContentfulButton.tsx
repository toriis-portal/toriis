import type { FC } from 'react'

import { PrimaryButton } from '../../components'

export const ContentfulButton: FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <p className="font-klima font-semibold">
        Manage site wide content through Contentful
      </p>
      <div className="">
        <PrimaryButton
          text="Go to Contentful"
          link="https://app.contentful.com/spaces/gslvrj5c21wx/"
          className="flex items-center justify-center gap-2 !px-10 text-center"
        />
      </div>
    </div>
  )
}

export default ContentfulButton
