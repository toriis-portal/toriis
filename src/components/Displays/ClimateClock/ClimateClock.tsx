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
      <div id="climate-clock-container" className="mx-auto w-5/6 items-center">
        <Script src="https://climateclock.world/widget-v2.js" async />
        <climate-clock />
      </div>
    </>
  )
}

export default ClimateClock
