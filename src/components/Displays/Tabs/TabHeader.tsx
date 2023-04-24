import clsx from 'clsx'
import type { FC } from 'react'

const TabHeader: FC<{ title: string; active: boolean }> = ({
  title,
  active,
}) => {
  const MAX_TITLE_LENGTH = 5
  let truncatedTitle = title
  if (title.length > MAX_TITLE_LENGTH) {
    truncatedTitle = title.substring(0, MAX_TITLE_LENGTH) + '...'
  }
  return (
    <div
      className={clsx(
        'rounded-t-lg  px-4 ',
        { 'bg-lightBlue': !active },
        { 'bg-clementine/20': active },
      )}
    >
      <p
        className={clsx('border-b-2 py-3.5 px-4 ', {
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
