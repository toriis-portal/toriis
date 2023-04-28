import React from 'react'
import Image from 'next/image'
import type { FC } from 'react'
import type { Asset } from 'contentful'
import clsx from 'clsx'

interface ImageWithCaptionProps {
  img: Asset
  captionStyle?: string
}

const ImageWithCaption: FC<ImageWithCaptionProps> = ({ img, captionStyle }) => {
  return (
    <div className="flex w-full flex-row justify-center">
      <div className="flex w-fit flex-col">
        <div className="mb-5 flex items-center justify-center">
          <Image
            src={'http:' + img.fields.file.url}
            alt={img.fields.title}
            width={850}
            height={850}
          />
        </div>
        <div className={clsx(captionStyle, 'flex-start')}>
          {img.fields.description && <p>{img.fields.description}</p>}
        </div>
      </div>
    </div>
  )
}

export default ImageWithCaption
