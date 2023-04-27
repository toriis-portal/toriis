import type { Request } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Spinner } from 'flowbite-react'

import { api } from '../../../utils/api'
import { RequestReviewTable, Tag, LoadMoreButton } from '../../../components'

const RequestPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

  const [myRequests, setMyRequests] = useState(true)

  let items: Request[] = []
  const userId = session?.user.id ?? ''

  const limit = 5
  const {
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = api.request.getRequests.useInfiniteQuery(
    {
      limit: limit,
      userId: userId,
      showOnlyUserRequests: myRequests,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: false,
    },
  )

  useEffect(() => {
    const refetchData = async () => {
      await refetch()

      refetchData().catch((err) => {
        console.error(err)
      })
    }
  }, [refetch])

  data?.pages.forEach((page) => {
    page.items.forEach((item) => {
      items = [...items, item]
    })
  })

  const selectButtonWrapStyle = clsx('basis-1/2 w-[18vw] min-w-fit')
  const selectButtonStyle = (selected: boolean) =>
    clsx('border -m-1 font-normal sm:text-base w-full min-w-fit text-sm', {
      'border-cobalt bg-lightBlue': selected,
      'border-black bg-white': !selected,
    })

  return (
    <div>
      {session && (
        <>
          <div className="flex flex-col items-center pt-24">
            <div className="flex flex-row justify-center gap-5">
              <button
                className={selectButtonWrapStyle}
                onClick={() => setMyRequests(true)}
              >
                <Tag
                  title="My Request Status"
                  className={selectButtonStyle(myRequests)}
                />
              </button>
              <button
                className={selectButtonWrapStyle}
                onClick={() => setMyRequests(false)}
              >
                <Tag
                  title="Review Database Requests"
                  className={selectButtonStyle(!myRequests)}
                />
              </button>
            </div>
            <RequestReviewTable
              requests={items}
              myRequests={myRequests}
              className={'w-5/6 pt-16 pb-4'}
            />
            {(isLoading || !data || isFetchingNextPage) && <Spinner />}
            <LoadMoreButton
              onClick={() => {
                void fetchNextPage()
              }}
              disabled={!hasNextPage || isFetchingNextPage}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default RequestPage
