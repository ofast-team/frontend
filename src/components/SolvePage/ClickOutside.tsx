import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'

export default function ClickOutside({
  children,
  onClickOutside,
}: {
  children: React.ReactNode
  onClickOutside: () => void
}) {
  const ref: React.RefObject<HTMLInputElement> = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])
  return <Box ref={ref}>{children}</Box>
}
