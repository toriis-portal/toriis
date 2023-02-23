import type { FC } from 'react'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const PrimaryButton: FC = () => {
  //   const { data: sessionData } = useSession()

  return (
    <button
      className="order-solid rounded border-2 border-colbalt bg-lightBlue px-5 py-1 shadow-[-8px_8px_0px_0px_colbalt]"
      //   onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      <b className="font-semibold">
        {1 ? 'More About Fossil Fuel' : 'Learn About Investments'}{' '}
        <ArrowRightIcon className="bold inline h-9 w-5" />{' '}
      </b>
    </button>
  )
}

export default PrimaryButton
