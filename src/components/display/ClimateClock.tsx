import Script from 'next/script'
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'climate-clock': DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

const ClimateClock: FC = () => {
  return (
    <div
      id="climate-clock-container"
      className="mx-auto my-8 w-fit items-center border-8 border-white"
    >
      <Script src="https://climateclock.world/widget-v2.js" async />
      <climate-clock />
    </div>
  )
}

export default ClimateClock
