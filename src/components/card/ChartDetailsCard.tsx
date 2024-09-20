import { useEffect, useState, type FC } from 'react'

const ChartDetailsCard: FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [isMobile, setIsMobile] = useState(true)

  // useEffect(() => {
  //   const updateIsMobile = () => {
  //     if (window.innerWidth <= 768) {
  //       setIsMobile(true)
  //     } else {
  //       setIsMobile(false)
  //     }
  //   }

  //   // Initial check
  //   updateIsMobile()

  //   // Add resize event listener
  //   window.addEventListener('resize', updateIsMobile)
  //   return () => {
  //     window.removeEventListener('resize', updateIsMobile)
  //   }
  // }, [])

  // if (isMobile) {
  //   return <div />
  // }
  return (
    <div className="body-normal rounded-xl bg-[#F4F4F4] p-4 leading-snug">
      {children}
    </div>
  )
}

export default ChartDetailsCard
