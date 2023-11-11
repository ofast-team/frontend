import React from 'react'
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
import { Link } from 'react-router-dom'

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

interface lesson {
  group: string
  name: string
  urlParam: string
}

const lessons: lesson[] = [
  {
    group: 'Intro Algo Design',
    name: 'Brute Force',
    urlParam: 'dp',
  },
  {
    group: 'Intro Algo Design',
    name: 'Intro Greedy',
    urlParam: 'greedy',
  },
  {
    group: 'Intro Algo Design',
    name: 'Time & Memory Analysis',
    urlParam: 'dp',
  },
  {
    group: 'Intro Data Structures',
    name: 'Prefix Sums',
    urlParam: 'dp',
  },
  {
    group: 'Intro Data Structures',
    name: 'Lists & Vectors',
    urlParam: 'dp',
  },
  {
    group: 'Intro Data Structures',
    name: 'Stacks & Queues',
    urlParam: 'dp',
  },
]

const q1 =
  'Which of the problems below can be solved effectively using dynamic programming.'
const ans1 = ['Coin Denomination', 'Knapsack Problem', 'Sorting List']
const correct1 = ['Coin Denomination', 'Knapsack Problem']
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

export default function LearnPage() {
  const groupedLessons: Record<string, lesson[]> = {}

  lessons.forEach((lesson) => {
    if (!(lesson.group in groupedLessons)) {
      groupedLessons[lesson.group] = []
    }
    groupedLessons[lesson.group].push(lesson)
  })

  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Learn
      </Typography>

      <SearchBar />

      <LessonGroup title="Intro Algo Design">
        <InlineSpacing spacing={40} />

        <LessonButton
          onClick={() =>
            setLesson(
              <LessonPage
                blocks={[
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
                  <ReadingBlock content={markdown1} />,
                  <ReadingBlock content={markdown2} />,
                  <ReadingBlock content={markdown3} />,
                  <FITBBlock
                    question={
                      'Complete the following recurrence relation: fib[i] = **BLANK** + fib[i - 2]'
                    }
                    correctAnswer={'fib[i - 1]'}
                  />,
                ]}
              />,
            )
          }
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
      {Object.entries(groupedLessons).map((lessonGroup, groupIndex) => {
        return (
          <>
            <LessonGroup title={lessonGroup[0].toString()}>
              <InlineSpacing spacing={40} />
              {lessonGroup[1].map((lesson) => (
                <>
                  <LessonButton>
                    <Link
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      to={'/learn/' + lesson.urlParam}
                    >
                      {lesson.name}
                    </Link>
                  </LessonButton>
                  <InlineSpacing spacing={60} />
                </>
              ))}

              <NextButton>
                <ArrowForwardIcon style={{ fontSize: '3rem' }} />
              </NextButton>
            </LessonGroup>

            {groupIndex + 1 < Object.entries(groupedLessons).length && (
              <Divider />
            )}
          </>
        )
      })}
    </Container>
  )
}
