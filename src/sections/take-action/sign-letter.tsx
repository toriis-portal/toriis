import { HighlightedTitle } from '../../components'

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
        form!
      </div>
    </div>
  )
}

export default SignLetter
