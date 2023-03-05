import type { FC } from 'react'

import { HighlightedTitle } from '../components'

interface InputProps {
  text: string
  data: TimelineEntry[]
}

export interface TimelineEntry {
  date: string
  text: string
}

interface TimlineItemProps {
  data: TimelineEntry[]
  isLeft: boolean
}

const Spacer = () => {
  return <div className="ml-10 min-h-[45%] min-w-fit" />
}

const getDirection = (isLeft: boolean, isAbbreviated: boolean) => {
  if (isLeft) {
    return isAbbreviated ? 'l' : 'left'
  } else {
    return isAbbreviated ? 'r' : 'right'
  }
}

const TimelineItem: FC<TimlineItemProps> = ({ data, isLeft }) => {
  return (
    <>
      {data.map((item, index) => {
        return (
          <div key={index}>
            {isLeft ? <> </> : <Spacer />}
            <div
              className={`m${getDirection(
                isLeft,
                true,
              )}-10 flex min-h-fit flex-col`}
            >
              <div
                className={`relative float-right flex w-full flex-row justify-${
                  !isLeft ? 'start' : 'end'
                }`}
              >
                {!isLeft ? (
                  <>
                    <div className="align-right mr-10">
                      <div
                        className="relative top-1/2
                    float-left w-16 border-t-4 border-clementine"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div
                  className={`m${getDirection(
                    isLeft,
                    false,
                  )}-20 basis-5/12 rounded-lg bg-darkTeal py-2`}
                >
                  <p className="m-0 text-center text-5xl text-white">
                    {item.date}
                  </p>
                </div>
                {!isLeft ? (
                  <></>
                ) : (
                  <>
                    <div className="align-left ml-10">
                      <div className="relative top-1/2 float-right w-16 border-t-4 border-clementine" />
                    </div>
                  </>
                )}
              </div>
              <div
                className={`p-10 m${getDirection(
                  !isLeft,
                  true,
                )}-28 text-${getDirection(!isLeft, false)} `}
              >
                <p className={`px-10 text-xl text-black`}>{item.text}</p>
              </div>
            </div>
            {isLeft ? <Spacer /> : <> </>}
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

const TimelineSection: FC<InputProps> = ({ text, data }) => {
  const splitData = splitTimeline(data) ?? [[], []]
  const splitLeft = splitData[0]
  const splitRight = splitData[1]

  return (
    <div className="relative mx-96 h-[400px] min-h-screen border-spacing-1 text-6xl">
      <HighlightedTitle title={text} />
      <div className="absolute box-border h-full w-1/2 border-spacing-1 border-r-8 border-clementine"></div>
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col">
          <TimelineItem data={splitLeft} isLeft={true} />
        </div>
        <div className="flex w-1/2 flex-col">
          <TimelineItem data={splitRight} isLeft={false} />
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
