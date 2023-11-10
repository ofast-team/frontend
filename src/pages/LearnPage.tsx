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
import MCQBlock from '../components/MCQBlock'
import FITBBlock from '../components/FITBBlock'
import fetchLessonContent from '../functions/FetchLessonContent'

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

const dp = await fetchLessonContent('dynamic_programming/lesson.md')
const markdown1 = await fetchLessonContent('dynamic_programming/markdown1.md')
const markdown2 = await fetchLessonContent('dynamic_programming/markdown2.md')
const markdown3 = await fetchLessonContent('dynamic_programming/markdown3.md')

const q1 =
  'Which of the problems below can be solved effectively using dynamic programming.'
const ans1 = ['Coin denomination', 'Knapsack Problem', 'Sorting List']
const correct1 = ['Coin denomination', 'Knapsack Problem']

const q2 =
  'In dynamic programming, what is the key characteristic that distinguishes it from other algorithmic approaches?'
const ans2 = ['Recursion', 'Iteration', 'Memoization']
const correct2 = ['Memoization']

export default function LearnPage() {
  const [lesson, setLesson] = useState<React.ReactNode>(null)

  return !lesson ? (
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
                  />,
                  <MCQBlock
                    question={q2}
                    answerOptions={ans2}
                    correctOptions={correct2}
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
    </Container>
  ) : (
    lesson
  )
}
