import type { FC } from 'react'

import NumberCircle from './NumberCircle'
import HighlightedTitle from './HighlightedTitle'
import NumberCircleListItem from './NumberCircleListItem'

interface props {
    title: string,
    val: string,
    content: string,
    
}

const DivestmentListItem: FC<props> = ({title, val, content}) => {
    return (
        <>
        <div>
            <header className='pb-10 text-left text-2xl font-bold'>
                <HighlightedTitle title={title}/>
            </header>
            <NumberCircleListItem listVal={val} listContent={content}/>
        </div>


        </>
        
    )
}

export default DivestmentListItem