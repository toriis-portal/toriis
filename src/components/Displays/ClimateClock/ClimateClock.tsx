import React from 'react'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'climate-clock': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

const ClimateClock = () => {
  return (
    <>
      <div className="mx-auto w-[79rem] items-center">
        <script src="https://climateclock.world/widget-v2.js" async></script>
        <climate-clock />
      </div>
    </>
  )
}

export default ClimateClock
