import type { FC } from 'react'

interface ReadMoreButtonProps {
  isOpen: boolean
  handleOpen: () => void
}

const ReadMoreButton: FC<ReadMoreButtonProps> = ({ isOpen, handleOpen }) => {
  return (
    <button
      className="ml-auto rounded-2xl bg-clementine pl-4 pr-3 pb-1 pt-2 text-center text-sm italic"
      onClick={handleOpen}
    >
      {isOpen ? 'Show Less' : 'Read More'}
    </button>
  )
}

export default ReadMoreButton
