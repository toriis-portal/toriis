import clsx from 'clsx'

const CapitalizedTitle = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  const firstLetterAccent = clsx(
    'block',
    'first-letter:text-clementine',
    'first-letter:font-black',
  )

  return (
    <span
      className={clsx(
        'space-x-1 leading-7',
        className,
        'header-1 flex max-w-full flex-wrap font-medium',
      )}
      {...props}
    >
      <span className={firstLetterAccent}>Transparent</span>
      <span>and</span>
      <span className={firstLetterAccent}>Open</span>
      <span className={firstLetterAccent}>Resource</span>
      <span>for</span>
      <span className={firstLetterAccent}>Institutional</span>
      <span className={clsx(firstLetterAccent)}>
        Investment<span className="text-clementine">s</span>
      </span>
    </span>
  )
}

export default CapitalizedTitle
