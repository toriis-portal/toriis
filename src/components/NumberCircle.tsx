import type {FC} from 'react'

interface props {
    val: string,
}

const NumberCircle: FC<props> = ({val}) => {
    return (
        <>
        <div className='mt-4 h-15 w-15 flex justify-center items-center'>
            <div className='relative z-0 h-12 w-12 text-colbalt rounded-3xl bg-colbalt'>
                <div className='font-bold absolute inset-x-2 -inset-y-2 border-2 h-12 w-12 leading-10 text-colbalt rounded-3xl text-3xl text-center bg-white border-colbalt'>
                    {val}
                </div>
            </div>
        </div>
        </>

    )

}

export default NumberCircle