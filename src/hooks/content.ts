import { useState, useEffect } from 'react'

import { contentClient } from '../utils/content'

const useContent = (contentType: string) => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      await contentClient
        .getEntries({
          content_type: contentType,
        })
        .then((res) => {
          setData(res.items)
          setIsLoading(false)
        })
    }
    void getData()
  }, [contentType])

  return { data, isLoading }
}

export default useContent
