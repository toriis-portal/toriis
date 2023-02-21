import type { FC } from 'react'

import HomeData from '../info/home.json'

const Landing: FC = () => {
  return <section id="Landing">This is an {HomeData.example}</section>
}

export default Landing
