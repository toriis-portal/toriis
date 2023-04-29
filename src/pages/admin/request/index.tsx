import type { Request } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Spinner } from 'flowbite-react'

import { api } from '../../../utils/api'
import {
  RequestReviewTable,
  AdminNavBar,
  TabButton,
  LoadMoreButton,
} from '../../../components'

const RequestPage: FC = () => {
  const { data: session, status } = useSession()
  const { push } = useRouter()
  const userId = session?.user.id ?? ''
  const [showOnlyUserRequests, setShowOnlyUserRequests] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      void push('/auth/error')
    }
  }, [push, status])

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
      showOnlyUserRequests: showOnlyUserRequests,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: false,
      enabled: !!userId,
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

  type QueryDataType = typeof data
  const parseData = (data: QueryDataType) => {
    let items: Request[] = []
    data?.pages.forEach((page) => {
      page.items.forEach((item) => {
        items = [...items, item]
      })
    })
    return items
  }

  return (
    <div>
      {session && (
        <>
          <AdminNavBar />
          <div className="flex flex-col items-center pt-12">
            <div className="flex flex-row justify-center gap-5">
              <TabButton
                text="My Request Status"
                onClick={() => setShowOnlyUserRequests(true)}
                active={showOnlyUserRequests}
              />
              <TabButton
                text="Review Database Requests"
                onClick={() => setShowOnlyUserRequests(false)}
                active={!showOnlyUserRequests}
              />
            </div>
            <RequestReviewTable
              requests={parseData(data)}
              myRequests={showOnlyUserRequests}
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
