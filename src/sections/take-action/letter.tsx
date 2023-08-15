import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { Spinner } from 'flowbite-react'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import { HighlightedTitle, PrimaryButton, Toast } from '../../components'
import { api } from '../../utils/api'

interface LetterProps {
  openLetter: Document
  scrollToForm(): void
}

const OpenLetter: FC<LetterProps> = ({ openLetter, scrollToForm }) => {
  const { data, isLoading, isError, error } =
    api.signatory.getSignatoriesCount.useQuery()
  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }
  if (isError || !data) {
    return (
      <Toast
        type="error"
        message={error ? error.message : 'Error retrieving signatories count'}
      ></Toast>
    )
  }

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
        <p className="font-semibold ">Join our</p>
        <p className="subheader-1 px-6 text-8xl font-bold">{data}</p>
        <p className="font-semibold">signatories</p>
      </div>
      <PrimaryButton
        text="Sign the Letter"
        variant="clementine"
        className="mb-12 mt-9 !px-14 py-2"
        onClick={scrollToForm}
      >
        <ArrowRightIcon className="ml-3 h-9 w-5 stroke-2" />
      </PrimaryButton>
      <div className="space-y-6 px-12 lg:px-80">
        {documentToReactComponents(openLetter, mainParagraphStyle)}
      </div>
    </div>
  )
}

export default OpenLetter
