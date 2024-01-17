import React, { useEffect, useState, useRef } from 'react'
import { Box, Container, Typography } from '@mui/material'
import lessons from '../lessons.json'

import './LessonPage.css'
import '../components/ReadingBlock.css'

import MDX from '../components/MDXRenderer'
import { useParams, Navigate } from 'react-router-dom'

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

interface LessonBlockWrapperProps {
  block: React.ReactNode
  id: number
  blockRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  windowDimensions: {
    width: number
    height: number
  }
}

function LessonBlockWrapper({
  block,
  id,
  blockRefs,
  windowDimensions,
}: LessonBlockWrapperProps) {
  const [height, setHeight] = useState<number | undefined | null>(null)

  let adjustedHeight = height

  if (height && windowDimensions && height < windowDimensions.height) {
    adjustedHeight = windowDimensions.height
  }

  return (
    <Container
      key={id}
      sx={{
        scrollSnapAlign: 'start',
        height: adjustedHeight ? adjustedHeight : 'auto',
        overflowY: 'auto',
        pt: 15,
      }}
      ref={(element) => {
        blockRefs.current[id] = element
        setHeight(element?.offsetHeight)
      }}
    >
      {block}
    </Container>
  )
}

export default function LessonPage() {
  const params = useParams()
  const lesson: string = params.lesson as string

  if (!(lesson in lessons)) {
    return <Navigate to="/learn" replace />
  }

  const blockFilenames: string[] =
    'files' in lessons[lesson] ? lessons[lesson].files : []

  const blocks: JSX.Element[] = blockFilenames.map((lessonFilename) => (
    <MDX path={'/lessons/' + lesson + '/' + lessonFilename} />
  ))

  const blockRefs = useRef(new Array(blocks.length))
  const [offsetY, setOffsetY] = useState<number>(0)
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number
    height: number
  }>(getWindowDimensions())

  const currentIndex = () => {
    if (!blockRefs.current[0]) {
      return 0
    }

    let sum = 0
    let i = 0

    while (
      i + 1 < blockRefs.current.length &&
      sum + blockRefs.current[i].offsetHeight <= offsetY
    ) {
      sum += blockRefs.current[i].offsetHeight
      i++
    }

    return i
  }

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
          height: '100vh',
        }}
      >
        <Typography
          className="markdown"
          gutterBottom
          color="primary"
          component={'span'}
        >
          {blocks.map((block, id) => (
            <LessonBlockWrapper
              key={id}
              block={block}
              id={id}
              blockRefs={blockRefs}
              windowDimensions={windowDimensions}
            />
          ))}
        </Typography>
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
                blockRefs.current[id].scrollIntoView({ behavior: 'smooth' })
              }
            />
          )
        })}
      </Box>
    </Box>
  )
}
