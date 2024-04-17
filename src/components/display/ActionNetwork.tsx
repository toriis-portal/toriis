import React, { useEffect } from 'react'

const ActionNetworkWidget: React.FC = () => {
  useEffect(() => {
    // Create a link element for the CSS file
    const link = document.createElement('link')
    link.href = 'https://actionnetwork.org/css/style-embed-v3.css'
    link.rel = 'stylesheet'

    // Create a script element for the widget
    const script = document.createElement('script')
    script.src =
      'https://actionnetwork.org/widgets/v5/event/red-ccn-4-21?format=js&source=widget'
    script.async = true

    // Append both link and script elements to the document body
    document.body.appendChild(link)
    document.body.appendChild(script)

    // Cleanup function to remove the link and script when component unmounts
    return () => {
      document.body.removeChild(link)
      document.body.removeChild(script)
    }
  }, []) // Empty dependency array ensures this effect runs only once

  return (
    <div
      id="can-event-area-red-ccn-4-21"
      style={{ width: '90%', margin: '0 auto' }}
    >
      {/* This div is the target for our HTML insertion */}
    </div>
  )
}

export default ActionNetworkWidget
