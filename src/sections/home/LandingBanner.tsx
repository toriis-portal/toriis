import Image from 'next/image'

import bannerimage from '../../../public/banner.jpeg'
import { CapitalizedTitle } from '../../components'

const LandingBanner = () => {
  return (
    <div className="relative flex w-full overflow-hidden bg-black">
      <Image
        src={bannerimage as HTMLImageElement}
        alt="Hero Image"
        className="object-cover"
        fill
      />
      <div className="z-10 ml-8 mt-16 w-fit bg-cobalt px-4 pt-6 pb-4 text-white">
        <p className="text-[40px] font-[900]">
          Welcome to{' '}
          <span className="underline decoration-clementine">TORIIS:</span>
        </p>
        <CapitalizedTitle className="pt-6" />
      </div>
    </div>
  )
}
export default LandingBanner
