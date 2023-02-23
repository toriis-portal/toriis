import type { FC } from 'react'

import HomeData from '../info/home.json'

const SampleText: FC = () => {
  return (
    <>
      <p>{HomeData.sampleText}</p>
    </>
  )
}

export default SampleText
