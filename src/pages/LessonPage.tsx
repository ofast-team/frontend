import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import lessons from '../lessons.json'
import MDX from '../components/MDXRenderer'
import { useParams, Navigate, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import './LessonPage.css'

function LessonArrowButton({ children }) {
  return (
    <motion.div
      className="button arrowButtonContainer"
      whileHover={{
        scale: 1.005,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.995 }}
    >
      {children}
    </motion.div>
  )
}

export default function LessonPage() {
  const params = useParams()
  const location = useLocation()
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: 0.2,
      }}
    >
      <MDX path={'/lessons/' + lesson + '/' + lessonFilename} />
    </motion.div>
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
          <AnimatePresence>
            <div key={location.pathname}>{blocks[page]}</div>
          </AnimatePresence>
        </Typography>
      </Container>

      {page > 0 && (
        <Link
          to={buildLessonURL(page - 1)}
          style={{
            textDecoration: 'none',
            transform: 'translateY(-50%)',
            position: 'fixed',
            top: '50%',
            left: '10px',
          }}
        >
          <LessonArrowButton>
            <ArrowBackIosNewIcon className="arrowButtonIcon" />
          </LessonArrowButton>
        </Link>
      )}

      {page + 1 < blocks.length && (
        <Link
          to={buildLessonURL(page + 1)}
          style={{
            transform: 'translateY(-50%)',
            position: 'fixed',
            top: '50%',
            right: '10px',
          }}
        >
          <LessonArrowButton>
            <ArrowForwardIosIcon className="arrowButtonIcon" />
          </LessonArrowButton>
        </Link>
      )}
    </Box>
  )
}
