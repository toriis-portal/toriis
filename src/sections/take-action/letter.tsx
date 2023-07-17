import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import { HighlightedTitle, PrimaryButton } from '../../components'

interface LetterProps {
  openLetter: Document
  scrollToForm(): void
}

const OpenLetter: FC<LetterProps> = ({ openLetter, scrollToForm }) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <HighlightedTitle
          title="An Open Letter"
          size="large"
          color="clementine"
        />
      </div>
      <div className="flex flex-row items-center">
        <p className="font-semibold">Join our</p>
        {/* TODO: get this number from contentful */}
        <p className="px-6 text-8xl font-bold">709</p>
        <p className="font-semibold">signatories</p>
      </div>
      <PrimaryButton
        text="Sign the Letter"
        variant="clementine"
        className="mb-12 mt-9 py-2 !px-14"
        onClick={scrollToForm}
      >
        <ArrowRightIcon className="ml-3 h-9 w-5 stroke-2" />
      </PrimaryButton>
      {/* TODO: add arrow to button */}
      <div className="space-y-4 px-60">
        {documentToReactComponents(openLetter, mainParagraphStyle)}
      </div>
    </div>
  )
}

export default OpenLetter
