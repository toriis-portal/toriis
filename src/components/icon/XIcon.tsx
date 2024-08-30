import clsx from 'clsx'

const XIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32px"
    height="32px"
    viewBox="0 0 13 13"
    className={clsx('w', 'w-5', className)}
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.9926 1.42578H12.8551L8.78621 6.07625L13.5729 12.4045H9.82496L6.88943 8.56645L3.5305 12.4045H1.66694L6.01901 7.43029L1.42709 1.42578H5.27021L7.92368 4.9339L10.9926 1.42578ZM10.339 11.2897H11.371L4.70945 2.48199H3.602L10.339 11.2897Z"
    />
  </svg>
)

export default XIcon
