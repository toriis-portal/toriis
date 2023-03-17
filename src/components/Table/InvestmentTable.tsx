import type { FC } from 'react'
import type { Investment } from '@prisma/client'

const InvestmentTable: FC<{ investments: Investment[] }> = ({
  investments,
}) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Investment</th>
          <th>Coupon</th>
          <th>Maturity Date</th>
          <th>Quantity</th>
          <th>Cost Value</th>
          <th>Market Value</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {investments &&
          investments.map((investment: Investment) => {
            return (
              <tr key={investment.id}>
                <td>{investment.rawName}</td>
                <td>{investment.coupon}</td>
                <td>{investment.maturityDate.toString()}</td>
                <td>{investment.quantity}</td>
                <td>{investment.costVal}</td>
                <td>{investment.marketVal}</td>
                <td>{investment.year}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default InvestmentTable
