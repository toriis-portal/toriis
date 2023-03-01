import type { FC } from "react"
import yahooFinance from "yahoo-finance2"
import type { HistoricalOptions, HistoricalResult } from "yahoo-finance2/dist/esm/src/modules/historical"

const getResult = async (query: string, options: HistoricalOptions): Promise<HistoricalResult> => {
    const ret: HistoricalResult = await yahooFinance.historical(query, options) as HistoricalResult
    return ret
}

const CompanyDetails: FC = () => {
    const query = 'TSLA'
    const options = { period1: '2021-02-91' }
    console.log(getResult(query, options))

    return (
        <div>
            <p>
                hello
            </p>
        </div>

    );
}

export default CompanyDetails