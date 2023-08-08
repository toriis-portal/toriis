import Image from 'next/image'

import bannerimage from '../../../public/banner.jpeg'

const LandingBanner = () => {
  return (
    <div>
      <Image
        src={bannerimage as HTMLImageElement}
        className="w-auto"
        alt="Protest background"
      />
    </div>
  )
}
export default LandingBanner
