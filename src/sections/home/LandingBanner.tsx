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
        <div className="ml-8 mt-16 w-fit bg-cobalt px-4 pb-4 pt-6">
          <p className="text-[40px] font-[900]">
            Welcome to{' '}
            <span className="underline decoration-clementine">TORIIS:</span>
          </p>
          <CapitalizedTitle className="pt-6" />
        </div>

        <div className="mt-12 h-fit space-y-6 font-graph ">
          <p className="mx-auto w-fit pb-16 pt-12 text-[200px]">DIVEST NOW.</p>
          <p className="mx-auto w-fit pb-16 pt-7 text-[128px]">
            FOSSIL FREE ILLINOIS
          </p>
        </div>

        <div className="mx-auto mb-32 mt-16 flex w-fit flex-row space-x-12 text-black">
          <PrimaryButton
            text="Investment Database"
            link="/investments"
            className="w-64 !px-8"
          />
          <PrimaryButton
            text="Why Divest?"
            link="/fossil-fuel"
            className="w-64 !px-16"
          />
          <PrimaryButton
            text="Sign the Letter"
            link="/take-action"
            className="w-64 !px-12"
          />
        </div>
      </div>
    </div>
  )
}
export default LandingBanner
