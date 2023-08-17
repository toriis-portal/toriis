import { Spinner } from 'flowbite-react'

import { HighlightedTitle, LetterForm, Toast } from '../../components'
import { api } from '../../utils/api'

const SignLetter = () => {
  const infoParagraph = (
    <p className="">
      <span className="underline decoration-clementine">
        Support Fossil Fuel Divestment
      </span>{' '}
      at the{' '}
      <span className="underline decoration-clementine">
        University of Illinois
      </span>{' '}
      by signing the{' '}
      <span className="underline decoration-clementine">
        Fossil Free ILLINOIS Open Letter
      </span>
      .
    </p>
  )
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
    <div className="flex flex-col items-center bg-clementine/20 py-10">
      <div>
        <HighlightedTitle
          title="Sign the Letter"
          size="large"
          color="clementine"
        />
      </div>
      <div className="flex w-[calc(100%-120px)] pb-10">{infoParagraph}</div>
      <div className="w-[calc(100%-120px)] rounded-lg px-4 py-9 outline outline-1 sm:px-20">
        <p className="subheader-1 pb-12 text-center text-4xl font-semibold">
          FOSSIL FREE ILLINOIS OPEN LETTER
        </p>
        <div className="flex">
          <div className="invisible mr-0 flex w-0 flex-col items-center justify-center sm:visible sm:mr-10 sm:w-1/2">
            {infoParagraph}
            <div className="invisible flex flex-row items-end sm:visible">
              <p className="font-semibold">Join our</p>
              <p className="subheader-1 px-6 text-8xl font-bold text-clementine">
                {data}
              </p>
              <p className="font-semibold">
                signatories today<span className="text-clementine">.</span>
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <LetterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignLetter
