import type { FC } from 'react'

import LinkDisplay from '../../components/LinkDisplay'
import InstitutionalDivestments from '../../sections/InstitutionalDivestments'

const Home: FC = () => {
  return (
    <div>
      <InstitutionalDivestments />
      <LinkDisplay />
    </div>
  )
}

export default Home
