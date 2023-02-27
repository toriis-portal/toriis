import type { FC } from 'react'

import { api } from '../utils/api'

const Landing: FC = () => {
  const hello = api.example.hello.useQuery({ text: 'Toriis' })
  const source = api.example.countByInvestment.useQuery()

  console.log(source.data)

  return (
    <>
      <text>
        {hello.data?.greeting ? hello.data.greeting : 'No investment'}
      </text>
    </>
  )
}

export default Landing
