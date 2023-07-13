import type { FC } from 'react'
import clsx from 'clsx'

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  toggled: boolean
  link?: string
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  variant?: 'cobalt' | 'clementine'
}

const Toggle: FC<ToggleProps> = ({
  text,
  toggled,
  onClick,
  className = '',
  children,
  variant = 'cobalt',
  ...props
}) => {
  const buttonStyle = clsx(
    'flex flex-row justify-center ',
    'border',
    'rounded-full',
    {
      'bg-lightBlue border-cobalt': variant === 'cobalt' && toggled === true,
      'bg-white border-cobalt': variant === 'cobalt' && toggled === false,
      'bg-lightClementine border-clementine':
        variant === 'clementine' && toggled === true,
      'bg-white border-clementine':
        variant === 'clementine' && toggled === false,
    },
    className,
  )

  return (
    <div>
      <button onClick={onClick} className={buttonStyle} {...props}>
        <span className="flex flex-row px-5">
          <span className="flex flex-row px-2">{text}</span>
          {children}
        </span>
      </button>
    </div>
  )
}

export default Toggle
