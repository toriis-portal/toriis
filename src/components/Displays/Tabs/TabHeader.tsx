import clsx from 'clsx'
import type { FC } from 'react'
import { useState, useEffect } from 'react'

const TabHeader: FC<{ title: string; active: boolean }> = ({
  title,
  active,
}) => {
  const [truncatedTitle, setTruncatedTitle] = useState(title)

  useEffect(() => {
    const handleResize = () => {
      const MAX_TITLE_LENGTH = window.innerWidth > 1000 ? 5 : 2
      setTruncatedTitle(
        title.length > MAX_TITLE_LENGTH
          ? title.substring(0, MAX_TITLE_LENGTH) + '...'
          : title,
      )
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [title, truncatedTitle])

  return (
    <div
      className={clsx(
        'rounded-t-lg  px-4 ',
        { 'bg-lightBlue': !active },
        { 'bg-clementine/20': active },
      )}
    >
      <p
        className={clsx('whitespace-nowrap border-b-2 py-3.5 px-4', {
          'border-lightBlue': !active,
          'border-clementine': active,
        })}
      >
        {active ? title : truncatedTitle}
      </p>
    </div>
  )
}

export default TabHeader
