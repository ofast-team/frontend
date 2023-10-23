import React from 'react'
import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  IconButton
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { styled } from '@mui/material/styles'

import SearchBar from '../components/SearchBar'
import InlineSpacing from '../components/InlineSpacing'

const LessonButton = styled(Button)({
  border: '1px solid',
  borderRadius: 30,
  padding: '6px 12px',
  textTransform: 'none',
  fontSize: 28,
  fontFamily: [
    'Raleway',
    'sans-serif',
  ].join(','),
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
});

const NextButton = styled(IconButton)({
  backgroundColor: '#04364A',
  borderColor: '#04364A',
  border: '1px solid',
  color: '#DAFFFB',
  '&:hover': {
    borderColor: '#04364A',
    backgroundColor: 'white',
    color: '#04364A',
  }
});

interface LessonGroupProps {
  title: string;
  children: React.ReactNode;
}

function LessonGroup({ title, children }: LessonGroupProps) {
  return (
    <Box mt={4} mb={8}>
      <Typography variant="h4">
        {title}
      </Typography>
      <Box mt={4}>
        {children}
      </Box>
    </Box>
  )
}

export default function LearnPage() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom color="primary">
        Learn
      </Typography>

      <SearchBar />

      <LessonGroup title="Intro Algo Design">
        <InlineSpacing spacing={40} />

        <LessonButton>
          Brute Force
        </LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>
          Intro Greedy
        </LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>
          Time & Memory Analysis
        </LessonButton>
      </LessonGroup>

      <Divider />

      <LessonGroup title="Intro Data Structures">
        <InlineSpacing spacing={40} />

        <LessonButton>
          Prefix Sums
        </LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>
          Lists & Vectors
        </LessonButton>

        <InlineSpacing spacing={60} />

        <LessonButton>
          Stacks & Queues
        </LessonButton>

        <InlineSpacing spacing={40} />

        <NextButton>
          <ArrowForwardIcon style={{ fontSize: '3rem' }} />
        </NextButton>
      </LessonGroup>
    </Container>
  )
}
