import React, { useEffect, useState, useRef } from 'react'
import { Box, Container } from '@mui/material'

import './LessonPage.css'

interface LessonPageProps {
  blocks: ReadonlyArray<React.ReactNode>
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function SideNavigatorItem({ selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className="fadeColor"
      style={{
        marginTop: 10,
        height: selected ? 100 : 40,
        backgroundColor: selected ? '#04364a' : '#6DB6C3',
        borderRadius: 50,
        cursor: 'pointer',
      }}
    />
  )
}

export default function LessonPage({ blocks }: LessonPageProps) {
  const refs = useRef(new Array(blocks.length))
  const [offsetY, setOffsetY] = useState(0)
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  const currentIndex = () => Math.round(offsetY / windowDimensions.height)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          height: 'calc(100vh)',
        }}
      >
        {blocks.map((block, id) => {
          return (
            <Container
              key={id}
              sx={{
                scrollSnapAlign: 'start',
                height: '100%',
                overflowY: 'auto',
                pt: 15,
              }}
              ref={(element) => {
                refs.current[id] = element
              }}
            >
              {block}
            </Container>
          )
        })}
      </Box>

      <Box
        sx={{
          width: 20,
          transform: 'translateY(-50%)',
          position: 'fixed',
          top: '50%',
          left: '20px',
        }}
      >
        {blocks.map((_item, id) => {
          return (
            <SideNavigatorItem
              key={id}
              selected={currentIndex() === id}
              onClick={() =>
                refs.current[id].scrollIntoView({ behavior: 'smooth' })
              }
            />
          )
        })}
      </Box>
    </Box>
  )
}
