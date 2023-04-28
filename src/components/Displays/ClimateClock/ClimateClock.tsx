import Script from 'next/script'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

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

const ClimateClock = () => {
  return (
    <>
      <div
        id="climate-clock-container"
        className="mx-auto my-8 w-full items-center border border-8 border-white"
      >
        <Script src="https://climateclock.world/widget-v2.js" async />
        <climate-clock />
      </div>
    </>
  )
}

export default ClimateClock
