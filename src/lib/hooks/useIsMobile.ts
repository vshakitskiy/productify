"use client"

import { debounce } from "lodash-es"
import { useLayoutEffect, useState } from "react"

const useIsMobile = (screenSize: number) => {
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const updateSize = () =>
      setIsMobile(window.innerWidth < screenSize)
    
    window.addEventListener("resize", debounce(updateSize, 250))

    return () =>
      window.removeEventListener("resize", updateSize)
  }, [screenSize])

  return isMobile
}

export default useIsMobile