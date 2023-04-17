import Script from 'next/script'

const ClimateClock = () => {
  return (
    <>
      <div id="climate-clock-container" className="mx-auto w-5/6 items-center">
        <Script src="https://climateclock.world/widget-v2.js" async />
      </div>
    </>
  )
}

export default ClimateClock
