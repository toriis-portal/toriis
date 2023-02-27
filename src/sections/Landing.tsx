import type { FC } from 'react'
import { PieChart, Pie } from 'recharts'

import HomeData from '../info/home.json'

const Landing: FC = () => {
  const data02 = [
    {
      name: 'Group A',
      value: 100,
      fill: '#FFA902',
    },
    {
      name: 'Group B',
      value: 26,
      fill: '#E6F0FA',
    },
    {
      name: 'Group C',
      value: 100,
      fill: '#FF6112',
    },
    {
      name: 'Group D',
      value: 30,
      fill: '#17292E',
    },
    {
      name: 'Group E',
      value: 12,
      fill: '#0F81E8',
    },
  ]

  return (
    <>
      <PieChart width={730} height={250}>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        ></Pie>
      </PieChart>
    </>
  )
}

export default Landing
