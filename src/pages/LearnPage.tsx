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

import lessonsData from '../lessons.json'
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

const lessons: lesson[] = Object.entries(lessonsData).map((lessonData) => {
  return {
    group: lessonData[1].lessonGroup,
    name: lessonData[1].lessonName,
    urlParam: lessonData[0],
  }
})

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

      {Object.entries(groupedLessons).map((lessonGroup, groupIndex) => {
        return (
          <React.Fragment key={groupIndex}>
            <LessonGroup title={lessonGroup[0].toString()}>
              <InlineSpacing spacing={40} />
              {lessonGroup[1].map((lesson, lessonIndex) => (
                <React.Fragment key={lessonIndex}>
                  <LessonButton>
                    <Link
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      to={'/learn/' + lesson.urlParam}
                    >
                      {lesson.name}
                    </Link>
                  </LessonButton>
                  <InlineSpacing spacing={40} />
                </React.Fragment>
              ))}

              <NextButton>
                <ArrowForwardIcon style={{ fontSize: '3rem' }} />
              </NextButton>
            </LessonGroup>

            {groupIndex + 1 < Object.entries(groupedLessons).length && (
              <Divider />
            )}
          </React.Fragment>
        )
      })}
    </Container>
  )
}
