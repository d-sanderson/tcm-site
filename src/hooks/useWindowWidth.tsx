import { useState, useEffect } from 'react'

function getWindowWidth() {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    const { innerWidth: width } = window
    return {
      width,
    }
  }
  return { width: 0 }
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowWidth
}
