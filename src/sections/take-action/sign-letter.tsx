import { HighlightedTitle, LetterForm } from '../../components'

const SignLetter = () => {
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
        {/* TODO: need Graph FF Condensed font */}
        <p className="header-3 text-center font-semibold">
          FOSSIL FREE UIUC OPEN LETTER
        </p>
        <div className="flex">
          <div className="flex w-1/2 flex-col items-center justify-center">
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
              {/* TODO: need Graph FF Condensed font */}
              <p className="font-semibold">Join our</p>
              {/* TODO: get this number from contentful */}
              <p className="px-6 text-8xl font-bold">709</p>
              <p className="font-semibold">
                signatories today<span className="text-clementine">.</span>
              </p>
            </div>
          </div>
          <div className="h-[800px] w-1/2 bg-slate-100">
            <LetterForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignLetter
