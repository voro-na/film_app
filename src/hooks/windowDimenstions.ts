import { useEffect, useState } from 'react'

function getWindowDimensions (): object {
  const {
    innerWidth: width,
    innerHeight: height
  } = window
  return {
    width,
    height
  }
}

export function useWindowDimensions (): object {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize (): void {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  return windowDimensions
}
