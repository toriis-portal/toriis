import type { FC } from 'react'

interface ReadMoreButtonProps {
  isOpen: boolean
  handleOpen: () => void
}

const ReadMoreButton: FC<ReadMoreButtonProps> = ({ isOpen, handleOpen }) => {
  return (
    <button
      className="ml-auto rounded-2xl bg-clementine px-3 py-1 text-center text-sm italic"
      onClick={handleOpen}
    >
      {isOpen ? 'Show Less' : 'Read More'}
    </button>
  )
}

export default ReadMoreButton
