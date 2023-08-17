import Image from 'next/image'

import bannerimage from '../../../public/banner.jpeg'
import { CapitalizedTitle, PrimaryButton } from '../../components'

const LandingBanner = () => {
  return (
    <div className="relative flex w-full overflow-hidden bg-black text-white">
      <Image
        src={bannerimage as HTMLImageElement}
        alt="Hero Image"
        className="object-cover"
        fill
      />
      <div className="z-10 w-full">
        <div className="ml-8 mt-8 w-fit bg-cobalt px-4 pb-4 pt-6 md:mt-16">
          <p className="text-[40px] font-[900] leading-none">
            Welcome to{' '}
            <span className="underline decoration-clementine">TORIIS:</span>
          </p>
          <CapitalizedTitle className="pt-6" />
        </div>

        <div className="mt-12 h-fit font-graph leading-none">
          <p className="mx-auto w-fit text-center text-[120px] md:text-[200px]">
            DIVEST NOW.
          </p>
          <p className="mx-auto w-fit text-center text-[60px] md:text-[128px]">
            FOSSIL FREE ILLINOIS
          </p>
        </div>

        <div className="mb-16 mt-16 flex w-full flex-col items-center justify-center space-y-4 text-black md:mb-32 md:flex-row md:space-x-12 md:space-y-0">
          <PrimaryButton
            text="Investment Database"
            link="/investments"
            className="w-64"
          />
          <PrimaryButton
            text="Why Divest?"
            link="/fossil-fuel"
            className="w-64"
          />
          <PrimaryButton
            text="Sign the Letter"
            link="/take-action"
            className="w-64"
          />
        </div>
      </div>
    </div>
  )
}
export default LandingBanner
