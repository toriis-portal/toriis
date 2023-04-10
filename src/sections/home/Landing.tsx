import type { FC } from 'react'
import React from 'react'
import type { Document } from '@contentful/rich-text-types'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useState } from 'react'

import LeaveConfirmationModal from '../../components/Modals/LeaveConfirmationModal'
import {
  PrimaryButton,
  LandingDonutChart,
  CapitalizedTitle,
} from '../../components'

const Landing: FC<{ text: Document }> = ({ text }) => {
  // Custom contentful render for bold text and paragraph
  const contentfulOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <span className="font-semibold underline decoration-clementine decoration-2 underline-offset-4">
          {text}
        </span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="mb-8">{children}</p>
      ),
    },
  }

  // LeaveConfirmationModal requires a state variable to be passed in at parent level
  const [modal, setModal] = useState(false)

  // as well as a setState() function for closing the modal (used for both continue and leave)
  const setIsOpen = () => setModal(!modal)

  // functionality for leaving page should NOT include the setState() function
  // const leave = () => {
  //   window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  // }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="h-20 w-20" onClick={setIsOpen}>
          Click Me To Open Modal
        </div>

        <LeaveConfirmationModal
          isOpen={modal} // state variable
          setIsOpen={setIsOpen} // set state variable
          // onLeave={leave} // leave functionality ONLY, not setting state variable. Modal will handle
        />

        <CapitalizedTitle />
        <div className="flex flex-col items-center justify-center px-14 py-8 lg:flex-row">
          <div className="basis-3/7">
            <LandingDonutChart />
            <div className="flex justify-center pt-2 font-inter text-xl font-semibold">
              Assets Per Sector
            </div>
          </div>
          <div className="basis-4/7">
            <div className="mb-6 p-4 lg:pr-14">
              {documentToReactComponents(text, contentfulOptions)}
              <div className="flex flex-col gap-12 md:flex-row">
                <PrimaryButton
                  text="More About Fossil Fuels"
                  link="/fossil-fuel"
                />
                <PrimaryButton
                  text="Learn About Investment"
                  link="/investments"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
