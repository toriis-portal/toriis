import clsx from 'clsx'

// font-medium = font-[500]
// font-normal = font-[400]

// text-base = text-[16px]
// text-xs = text-[12px]

// leading-9 = leading-[36px]
// leading-8 = leading-[32px]

// in order font-family | font-weight | font-size | line-height
const h1 = clsx('font-klima font-[647] text-[32px] leading-9')

const h2 = clsx('font-klima font-[559] text-[28px] leading-8')

const h3 = clsx('font-klima font-[559] text-[22px] leading-[25px]')

const bb = clsx('font-inter font-medium text-base leading-[19px]')

const r1 = clsx('font-inter font-normal text-base leading-[19px]')

const r2 = clsx('font-inter font-normal text-xs leading-[15px]')

export const fontOptions = { h1, h2, h3, bb, r1, r2 }
