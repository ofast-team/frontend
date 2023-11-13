import React, { useEffect, useState, useRef } from 'react'
import { Box, Container } from '@mui/material'

import './LessonPage.css'

import { useParams, Navigate } from 'react-router-dom'

import ReadingBlock from '../components/ReadingBlock'
import MCQBlock from '../components/MCQBlock'
import FITBBlock from '../components/FITBBlock'

import fetchLessonContent from '../functions/FetchLessonContent'

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

const dp = await fetchLessonContent('dynamic_programming/lesson.md')
const markdown1 = await fetchLessonContent('dynamic_programming/markdown1.md')
const markdown2 = await fetchLessonContent('dynamic_programming/markdown2.md')
const markdown3 = await fetchLessonContent('dynamic_programming/markdown3.md')

const q1 =
  'Which of the problems below can be solved effectively using dynamic programming.'
const ans1 = ['Coin denomination', 'Knapsack Problem', 'Sorting List']
const correct1 = ['Coin denomination', 'Knapsack Problem']
const hint1 = 'DP is used to solve and store subproblem.'
const explanation1 =
  'Coin Denomination and Knapsack Problem both explore and store subproblem recursively.'

const q2 =
  'In dynamic programming, what is the key characteristic that distinguishes it from other algorithmic approaches?'
const ans2 = ['Recursion', 'Iteration', 'Memoization']
const correct2 = ['Memoization']
const hint2 = 'Store and reuse results to avoid redundant computations.'
const explanation2 =
  'Memoization caches expensive functions calls and reuses when same input occurs.'

const lessons = {
  dp: [
    <ReadingBlock content={dp} />,
    <MCQBlock
      question={q1}
      answerOptions={ans1}
      correctOptions={correct1}
      hint={hint1}
      explanation={explanation1}
    />,
    <MCQBlock
      question={q2}
      answerOptions={ans2}
      correctOptions={correct2}
      hint={hint2}
      explanation={explanation2}
    />,
    <FITBBlock
      question={
        'Is this the real life? Is this just {fantasy}? ' +
        'Caught in a {landslide}, no escape from reality. ' +
        'Open your eyes, look up to the {skies} and see...'
      }
    />,
    <ReadingBlock content={markdown1} />,
    <ReadingBlock content={markdown2} />,
    <ReadingBlock content={markdown3} />,
  ],
  greedy: [
    <ReadingBlock content={`# Welcome to Greedy \n Let's get started`} />,
    <ReadingBlock content={markdown1} />,
    <ReadingBlock content={markdown2} />,
    <ReadingBlock content={markdown3} />,
  ],
}

export default function LessonPage() {
  const params = useParams()

  if (!params.lesson || !(params.lesson in lessons)) {
    return <Navigate to="/learn" replace={true} />
  }

  const blocks = lessons[params.lesson]
  const blockRefs = useRef(new Array(blocks.length))
  const [offsetY, setOffsetY] = useState(0)
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

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
        {blocks.map((block, id) => (
          <LessonBlockWrapper
            key={id}
            block={block}
            id={id}
            blockRefs={blockRefs}
            windowDimensions={windowDimensions}
          />
        ))}
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
