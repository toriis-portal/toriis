import type { FC } from 'react'

import { PrimaryButton } from '../../components'

export const ContentfulButton: FC = () => {
  const text = <span className="mx-4">Go to Contentful</span>

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <p className="font-klima font-semibold">
        Manage site wide content through Contentful
      </p>
      <div className="">
        <PrimaryButton
          text={text}
          link="https://app.contentful.com/spaces/gslvrj5c21wx/"
        />
      </div>
    </div>
  )
}

export default ContentfulButton
