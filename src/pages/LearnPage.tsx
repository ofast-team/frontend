import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Divider,
  Button,
  IconButton,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import {
  ScrollMenu,
  VisibilityContext,
  publicApiType,
} from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'

import usePreventBodyScroll from '../utils/usePreventBodyScroll'

import '../utils/hideScrollbar.css'

import SearchBar from '../components/SearchBar'
import { LessonData, searchLessons } from '../utils/lesson-search-utils'

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

const ArrowButton = styled(IconButton)({
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

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

  if (isTouchpad) {
    ev.stopPropagation()
    return
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext()
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev()
  }
}

interface LessonGroupProps {
  title: string
  lessons: LessonData[]
}

// itemId is needed for tracking items in the horizontal scroll list
// eslint-disable-next-line
function Lesson({ lesson, itemId }: { lesson: LessonData; itemId: string }) {
  return (
    <>
      <LessonButton sx={{ mx: '10px', whiteSpace: 'nowrap' }}>
        <Link
          style={{ color: 'inherit', textDecoration: 'none' }}
          to={'/learn/' + lesson.urlParam}
        >
          {lesson.name}
        </Link>
      </LessonButton>
    </>
  )
}

function LeftArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext)
  const isFirstItemVisible = visibility.useIsVisible('first', true)

  return (
    <ArrowButton
      disabled={isFirstItemVisible}
      onClick={() => visibility.scrollPrev()}
      sx={{ mr: '5px' }}
    >
      <ArrowBackIcon sx={{ fontSize: '3rem' }} />
    </ArrowButton>
  )
}

function RightArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext)
  const isLastItemVisible = visibility.useIsVisible('last', false)

  return (
    <ArrowButton
      disabled={isLastItemVisible}
      onClick={() => visibility.scrollNext()}
      sx={{ ml: '5px' }}
    >
      <ArrowForwardIcon sx={{ fontSize: '3rem' }} />
    </ArrowButton>
  )
}

function LessonGroup({ title, lessons }: LessonGroupProps) {
  const { disableScroll, enableScroll } = usePreventBodyScroll()

  return (
    <Box mt={4} mb={8}>
      <Typography variant="h4">{title}</Typography>
      <Box mt={4} onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onWheel={onWheel}
        >
          {lessons.map((lesson, lessonIndex) => (
            <Lesson
              key={lessonIndex}
              lesson={lesson}
              itemId={lessonIndex.toString()} // NOTE: itemId is required for track items
            />
          ))}
        </ScrollMenu>
      </Box>
    </Box>
  )
}

export default function LearnPage() {
  const [keywords, setKeywords] = useState<string>('')

  const lessons: LessonData[] = searchLessons(keywords)
  const groupedLessons: Record<string, LessonData[]> = {}

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

      <SearchBar
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />

      {Object.entries(groupedLessons).map((lessonGroup, groupIndex) => {
        return (
          <React.Fragment key={groupIndex}>
            <LessonGroup
              title={lessonGroup[0].toString()}
              lessons={lessonGroup[1]}
            />

            {groupIndex + 1 < Object.entries(groupedLessons).length && (
              <Divider />
            )}
          </React.Fragment>
        )
      })}
    </Container>
  )
}
