import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const PrimaryButton: React.FC<{ text: string; link: string }> = ({
  text,
  link,
}) => {
  return (
    <Link href={link}>
      <button className="rounded border-2 border-solid border-cobalt bg-lightBlue px-5 py-1 shadow-[-8px_8px_0px_0px] shadow-cobalt hover:shadow-[-5px_5px_0px_0px] hover:shadow-cobalt ">
        <b className="font-semibold">
          {text} <ArrowRightIcon className="bold inline h-9 w-5" />{' '}
        </b>
      </button>
    </Link>
  )
}

export default PrimaryButton
