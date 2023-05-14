import { useEffect, useState, useCallback } from 'react'
import type { RefObject } from 'react'

/**
 * Handles user clicking outside a given ref element
 *
 * @param ref element to be checked
 * @param handler callback function to be called when the user clicks outside the ref
 */
export const useClickedOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler()
      }
    }
    document.addEventListener('click', handleClickOutside, { capture: true })
    return () => document.removeEventListener('click', handleClickOutside)
  }, [ref, handler])
}

/**
 * Handles conditionally rendering content based on Media Query
 *
 * @param threshold threshold of the media query
 * @param belowThreshold callback function to be called when the window width is below the threshold
 * @param aboveThreshold callback function to be called when the window width is above the threshold
 */
export const useMediaBreakPoint = (
  threshold: number,
  belowThreshold: () => void,
  aboveThreshold: () => void,
) => {
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth
    }
    return 0
  })

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  useEffect(() => {
    if (windowWidth < threshold) {
      belowThreshold()
    } else {
      aboveThreshold()
    }
  }, [windowWidth, threshold, belowThreshold, aboveThreshold])
}
