import { Spinner } from 'flowbite-react'

import { HighlightedTitle, LetterForm, Toast } from '../../components'
import { api } from '../../utils/api'

const SignLetter = () => {
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
      <div className="w-[calc(100%-120px)] rounded-lg py-9 px-20 outline outline-1">
        <p className="subheader-1 pb-12 text-center text-4xl font-semibold">
          FOSSIL FREE UIUC OPEN LETTER
        </p>
        <div className="flex">
          <div className="mr-10 flex w-1/2 flex-col items-center justify-center">
            <p className="">
              <span className="underline decoration-clementine">
                Support Fossil Fuel Divestment
              </span>{' '}
              at the{' '}
              <span className="underline decoration-clementine">
                University of Illinois Urbana-Champaign
              </span>{' '}
              by signing the{' '}
              <span className="underline decoration-clementine">
                Fossil Free UIUC Open Letter
              </span>
              .
            </p>
            <div className="flex flex-row items-end">
              <p className="font-semibold">Join our</p>
              <p className="subheader-1 px-6 text-8xl font-bold text-clementine">
                {data}
              </p>
              <p className="font-semibold">
                signatories today<span className="text-clementine">.</span>
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <LetterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignLetter
