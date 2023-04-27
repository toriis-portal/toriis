import React from 'react'
import Image from 'next/image'
import type { FC } from 'react'
import type { Asset } from 'contentful'

interface ImageWithCaptionProps {
  img: Asset
  captionStyle?: string
}

const ImageWithCaption: FC<ImageWithCaptionProps> = ({ img, captionStyle }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <Image
          src={'http:' + img.fields.file.url}
          alt={img.fields.title}
          width={1300}
          height={900}
        />
      </div>
      <div className={captionStyle}>
        {img.fields.description && <p>{img.fields.description}</p>}
      </div>
    </>
  )
}

export default ImageWithCaption
