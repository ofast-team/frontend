import React, { useEffect, useState, useRef } from 'react'
import { Box, Container } from '@mui/material'

import './LessonPage.css'

import ReadingBlock from '../components/ReadingBlock'
import { useParams, Navigate } from 'react-router-dom'

import MCQBlock from '../components/MCQBlock'
import FITBBlock from '../components/FITBBlock'

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

const dp = `
# Dynamic Programming
Dynamic programming is a powerful algorithmic technique used to solve complex problems by breaking them down into **simpler subproblems** and efficiently solving each subproblem **only once**. It is particularly useful for optimization problems and problems with overlapping substructures, where the same subproblems are encountered multiple times.

At the core of dynamic programming is the idea of storing and reusing solutions to subproblems, which leads to significant time and computational savings. This technique is often used in problems involving sequences, such as finding the shortest path in a graph, calculating Fibonacci numbers, or solving the knapsack problem.

One of the key advantages of dynamic programming is its ability to transform a problem into a more manageable form by building a solution iteratively. This process of solving subproblems and combining their solutions to tackle larger, more complex problems enables dynamic programming to provide efficient solutions to a wide range of computational challenges.

## Memoization
**Memoization** is a critical aspect of dynamic programming that involves storing the results of subproblem solutions to avoid redundant calculations. By memorizing these results in a table or data structure, dynamic programming ensures that each subproblem is **solved only once** and its solution is retrieved when needed, significantly improving the algorithm’s efficiency. This technique not only **reduces time complexity** but also simplifies the code and enhances its readability, making dynamic programming an invaluable tool in solving a diverse array of computational problems.

~~~python
# Create a dictionary to store previously computed Fibonacci values
memo = {}

def fibonacci(n):
    # Check if the value is already memoized
    if n in memo:
        return memo[n]

    # Base cases
    if n <= 1:
        return n

    # Calculate and memoize the Fibonacci value
    memo[n] = fibonacci(n - 1) + fibonacci(n - 2)
    return memo[n]

# Example usage:
n = 10
result = fibonacci(n)
print(f"The {n}-th Fibonacci number is {result}")
~~~
`

const markdown1 = `
# Reading 1
This is how to compute the $i$th fibonacci number: \n
$F_i = F_{i-1} + F_{i-2}$ \n
$\\sum_{n=1}^{\\infty} 2^{-n} = 1$ \n
$\\pi \\approx 3.14159$ \n
$\\pm \\, 0.2$ \n
$\\dfrac{0}{1} \\neq \\infty$ \n
`

const markdown2 = `
# Reading 2
$0 < x < 1$ \n
$0 \\leq x \\leq 1$ \n
$x \\geq 10$ \n
$\\forall \\, x \\in (1,2)$ \n
$\\exists \\, x \\notin [0,1]$ \n
$A \\subset B$ \n
$A \\subseteq B$ \n 
$A \\cup B$ \n
$A \\cap B$ \n
`

const markdown3 = `
# Reading 3
$X \\implies Y$ \n
$X \\impliedby Y$ \n
$a \\to b$ \n
$a \\longrightarrow b$ \n
$a \\Rightarrow b$ \n
$a \\Longrightarrow b$ \n
$a \\propto b$
`

const q1 =
  'Which of the problems below can be solved effectively using dynamic programming.'
const ans1 = ['Coin denomination', 'Knapsack Problem', 'Sorting List']
const correct1 = ['Coin denomination', 'Knapsack Problem']

const q2 =
  'In dynamic programming, what is the key characteristic that distinguishes it from other algorithmic approaches?'
const ans2 = ['Recursion', 'Iteration', 'Memoization']
const correct2 = ['Memoization']

const lessons = {
  dp: [
    <ReadingBlock content={dp} />,
    <MCQBlock question={q1} answerOptions={ans1} correctOptions={correct1} />,
    <MCQBlock question={q2} answerOptions={ans2} correctOptions={correct2} />,
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
