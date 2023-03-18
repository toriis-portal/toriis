import clsx from 'clsx'
import type { FC } from 'react'

import { HighlightedTitle } from '../../components'
import type { TimelineEntry } from '../../types'

interface TimlineItemProps {
  data: TimelineEntry[]
  isLeft: boolean
}

interface TimelineTickProps {
  isLeft: boolean
}

const TimelineTick: FC<TimelineTickProps> = ({ isLeft }) => {
  return (
    <>
      <div className={clsx({ 'mr-10': !isLeft, 'ml-10': isLeft })}>
        <div
          className={clsx(
            'relative top-1/2 w-16 border-t-4 border-clementine',
            {
              'float-right': !isLeft,
              'float-left': isLeft,
            },
          )}
        />
      </div>
    </>
  )
}

const TimelineItem: FC<TimlineItemProps> = ({ data, isLeft }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={index} className="flex flex-col">
            <div className="flex flex-initial flex-col">
              <div
                className={clsx('relative float-right flex w-full flex-row', {
                  'flex-row-reverse': isLeft,
                  '': !isLeft,
                })}
              >
                <TimelineTick isLeft={isLeft} />

                <div className="basis-3/12 rounded-lg bg-darkTeal py-2">
                  <p className="m-0 text-center text-4xl text-white">
                    {item.year}
                  </p>
                </div>
              </div>
              <div
                className={clsx('py-5', {
                  'pr-10': isLeft,
                  'pl-10': !isLeft,
                })}
              >
                <p
                  className={clsx('text-xl text-black', {
                    'mr-6 pr-10 text-right': isLeft,
                    'ml-6 pl-10 text-left': !isLeft,
                  })}
                >
                  {item.details}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

const splitTimeline = (
  data: TimelineEntry[],
): [TimelineEntry[], TimelineEntry[]] => {
  const splitData: [TimelineEntry[], TimelineEntry[]] = [[], []]
  data.forEach((item, index) => {
    if (index % 2 === 0) {
      splitData[0].push(item)
    } else {
      splitData[1].push(item)
    }
  })
  return splitData
}

const TimelineSection: FC<{ entries: TimelineEntry[] }> = ({ entries }) => {
  const splitData = splitTimeline(entries) ?? [[], []]
  const splitLeft = splitData[0]
  const splitRight = splitData[1]

  return (
    <>
      <HighlightedTitle title="Divestment History" />
      <div className="relative mx-[5%] my-10 min-h-screen min-w-[300px] border-spacing-1 overflow-x-scroll text-6xl">
        <div className="absolute box-border h-full w-1/2 border-spacing-1 border-r-8 border-clementine"></div>
        <div className="flex flex-row">
          <div className="pr-.5 flex w-1/2 flex-col">
            <TimelineItem data={splitLeft} isLeft={true} />
          </div>
          <div className="flex w-1/2 flex-col">
            <div className="ml-10 min-h-[5%] min-w-fit" />
            <TimelineItem data={splitRight} isLeft={false} />
          </div>
        </div>
      </div>
    </>
  )
}

export default TimelineSection
