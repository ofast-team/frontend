import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import lessons from '../lessons.json'
import MDX from '../components/MDXRenderer'
import { useParams, Navigate, Link } from 'react-router-dom'

import './LessonPage.css'

export default function LessonPage() {
  const params = useParams()
  const lesson: string = params.lesson as string

  if (!(lesson in lessons)) {
    return <Navigate to="/learn" replace />
  }

  const page = params.page ? parseInt(params.page) : 0

  const buildLessonURL = (newPage: number) => {
    return `/learn/${lesson}/${newPage}`
  }

  const blockFilenames: string[] =
    'files' in lessons[lesson] ? lessons[lesson].files : []

  const blocks: JSX.Element[] = blockFilenames.map((lessonFilename) => (
    <MDX path={'/lessons/' + lesson + '/' + lessonFilename} />
  ))

  if (page < 0 || page >= blocks.length) {
    return <Navigate to={buildLessonURL(0)} replace />
  }

  return (
    <Box sx={{ position: 'relative', p: 15 }}>
      <Container>
        <Typography
          className="markdown"
          gutterBottom
          color="primary"
          component="span"
        >
          {blocks[page]}
        </Typography>
      </Container>

      {page > 0 && (
        <Link
          to={buildLessonURL(page - 1)}
          style={{
            textDecoration: 'none',
            color: 'black',
            transform: 'translateY(-50%)',
            position: 'fixed',
            top: '50%',
            left: '20px',
          }}
        >
          <ArrowBackIosNewIcon />
        </Link>
      )}

      {page + 1 < blocks.length && (
        <Link
          to={buildLessonURL(page + 1)}
          style={{
            textDecoration: 'none',
            color: 'black',
            transform: 'translateY(-50%)',
            position: 'fixed',
            top: '50%',
            right: '20px',
          }}
        >
          <ArrowForwardIosIcon />
        </Link>
      )}
    </Box>
  )
}
