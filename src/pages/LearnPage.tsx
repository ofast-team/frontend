import React from 'react'
import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { styled } from '@mui/material/styles'

import SearchBar from '../components/SearchBar'
import InlineSpacing from '../components/InlineSpacing'
import ReadingBlock from '../components/ReadingBlock'
import LessonPage from './LessonPage'

const LessonButton = styled(Button)({
  border: '1px solid',
  borderRadius: 30,
  padding: '6px 12px',
  textTransform: 'none',
  fontSize: 28,
  fontFamily: ['Raleway', 'sans-serif'].join(','),
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#04364A',
    borderColor: '#04364A',
    color: '#DAFFFB',
  },
  '&:active': {
    backgroundColor: '#04364A',
    borderColor: '#04364A',
  },
})

const NextButton = styled(IconButton)({
  backgroundColor: '#04364A',
  borderColor: '#04364A',
  border: '1px solid',
  color: '#DAFFFB',
  '&:hover': {
    borderColor: '#04364A',
    backgroundColor: 'white',
    color: '#04364A',
  },
})

interface LessonGroupProps {
  title: string
  children: React.ReactNode
}

function LessonGroup({ title, children }: LessonGroupProps) {
  return (
    <Box mt={4} mb={8}>
      <Typography variant="h4">{title}</Typography>
      <Box mt={4}>{children}</Box>
    </Box>
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
`;

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
`;

const markdown3 = `
# Reading 3
$X \\implies Y$ \n
$X \\impliedby Y$ \n
$a \\to b$ \n
$a \\longrightarrow b$ \n
$a \\Rightarrow b$ \n
$a \\Longrightarrow b$ \n
$a \\propto b$
`;

export default function LearnPage() {
  const [lesson, setLesson] = useState<React.ReactNode>(null);

  return !lesson ? (
    <Container>
      <Typography variant="h3" gutterBottom color="primary">
        Learn
      </Typography>

      <SearchBar />

      <LessonGroup title="Intro Algo Design">
        <InlineSpacing spacing={40} />

        <LessonButton
          onClick={() => setLesson(
            <LessonPage
              blocks={[
                <ReadingBlock content={dp} />,
                <ReadingBlock content={markdown1} />,
                <ReadingBlock content={markdown2} />,
                <ReadingBlock content={markdown3} />
              ]}
            />
          )}
        >
          Brute Force
        </LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>Intro Greedy</LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>Time & Memory Analysis</LessonButton>
      </LessonGroup>

      <Divider />

      <LessonGroup title="Intro Data Structures">
        <InlineSpacing spacing={40} />

        <LessonButton>Prefix Sums</LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>Lists & Vectors</LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>Stacks & Queues</LessonButton>

        <InlineSpacing spacing={40} />

        <NextButton>
          <ArrowForwardIcon style={{ fontSize: '3rem' }} />
        </NextButton>
      </LessonGroup>
    </Container>
  ) : (
    lesson
  )
}
