import type { FC } from "react";

import NumberCircle from "./NumberCircle";

interface props {
    listVal: string,
    listContent: string
}

const NumberCircleListItem: FC<props> = ({listVal ,listContent}) => {
    return (
        <>
        <tr className='flex justify-center items-center ml-6'>
                <td className='h-16'>
                    <NumberCircle val={listVal}/>
                </td>

                <td className='ml-10 text-black text-xl font-bold'>
                    <p>{listContent}</p>
                </td>
            </tr>
        
        </>
    )
}

export default NumberCircleListItem