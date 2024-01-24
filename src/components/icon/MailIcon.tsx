import clsx from 'clsx'

const MainIcon = ({ className, ...props }: React.ComponentProps<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28px"
    height="22px"
    viewBox="-2 -1 15 10"
    className={clsx('w', className)}
    {...props}
  >
    <path
      fill="currentColor"
      d="M0 0V9H12V0H0ZM10.21 1L6 4.825L1.79 1H10.21ZM1 1.63L2.965 3.415L1 6.695V1.63ZM1.385 8L3.72 4.105L6 6.175L8.28 4.105L10.615 8H1.385ZM11 6.695L9.035 3.415L11 1.63V6.695Z"
    />
  </svg>
)

export default MainIcon
