import type {FC} from 'react'

interface props {
    title: string
}

const HighlightedTitle: FC<props> = ({title}) => {
    return (
        <>
        <text className='absolute'>
            <div className='absolute z-0 inset-y-5 -inset-x-4 bg-orange bg-opacity-60 h-2 w-full'/>
            <p className='relative z-10'>{title}</p>
        </text>
        </>
    )
}

export default HighlightedTitle