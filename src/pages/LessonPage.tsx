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

  const blockFilenames: string[] =
    'files' in lessons[lesson] ? lessons[lesson].files : []

  const buildLessonURL = (newPageIndex: number) => {
    const filenameWithoutExt = blockFilenames[newPageIndex].substring(
      0,
      blockFilenames[newPageIndex].indexOf('.'),
    )

    return `/learn/${lesson}/${filenameWithoutExt}`
  }

  const filenameWithoutExt = params.filenameWithoutExt
    ? params.filenameWithoutExt
    : blockFilenames[0]
  const pageIndex = blockFilenames.indexOf(filenameWithoutExt + '.mdx')

  const blocks: JSX.Element[] = blockFilenames.map((lessonFilename) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
      }}
    >
      <MDX path={'/lessons/' + lesson + '/' + lessonFilename} />
    </motion.div>
  ))

  if (pageIndex === -1) {
    return <Navigate to={buildLessonURL(0)} replace />
  }

  return (
    <Box sx={{ position: 'relative', mt: 15 }}>
      <Container>
        <Typography
          className="markdown themeborder"
          gutterBottom
          color="primary"
          component="span"
        >
          <AnimatePresence>
            <div key={location.pathname}>{blocks[pageIndex]}</div>
          </AnimatePresence>
        </Typography>
      </Container>

      {pageIndex > 0 && (
        <Link
          to={buildLessonURL(pageIndex - 1)}
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

      {pageIndex + 1 < blocks.length && (
        <Link
          to={buildLessonURL(pageIndex + 1)}
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
