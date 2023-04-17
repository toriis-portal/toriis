import React, { useEffect, useState } from 'react'

const ClimateClock = () => {
  const [isMounted, setIsMounted] = useState(false)

  /*
   * This useEffect checks to see if the Climate Clock widget is truthy (whether or not it has already been rendered)
   * before loading the script and appending the climate clock widget to the container.
   */
  useEffect(() => {
    if (!isMounted) {
      // Declare a custom script element and load the Climate Clock script.
      const script = document.createElement('script')
      script.src = 'https://climateclock.world/widget-v2.js'
      script.async = true
      script.onload = () => {
        const climateClock = document.createElement('climate-clock')
        const container = document.getElementById('climate-clock-container')
        if (container) {
          container.appendChild(climateClock)
          setIsMounted(true)
        } else {
          console.error(
            'Could not find element with ID "climate-clock-container"',
          )
        }
      }
      document.body.appendChild(script)
    }

    return () => {
      const climateClock = document.querySelector('climate-clock')
      // If the component has already been loaded, remove the duplicate.
      if (climateClock) {
        climateClock.remove()
      }
    }
  }, [isMounted])

  return (
    <>
      <div
        id="climate-clock-container"
        className="mx-auto w-5/6 items-center"
      ></div>
    </>
  )
}

export default ClimateClock
