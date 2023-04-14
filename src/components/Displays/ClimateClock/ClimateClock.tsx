import React, { useEffect, useState } from 'react'

const ClimateClock = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!isMounted) {
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
      if (climateClock) {
        climateClock.remove()
      }
    }
  }, [isMounted])

  return (
    <>
      <div
        id="climate-clock-container"
        className="mx-auto w-[79rem] items-center"
      ></div>
    </>
  )
}

export default ClimateClock
