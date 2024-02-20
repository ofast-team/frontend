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

interface TOCHeader {
  id: string
  value: string
  depth: number
}

function TableOfContents({ headers }: { headers: TOCHeader[] }) {
  if (headers.length === 0) {
    return <></>
  }

  return (
    <div style={{ paddingLeft: '10px' }}>
      <h3 style={{ marginBottom: 0 }}>Table of Contents</h3>
      {headers.map((header, i) => (
        <div
          key={i}
          style={{
            marginLeft: `${header.depth * 20}px`,
          }}
        >
          <a className="tocHeader" href={`#${header.id}`}>
            {header.value}
          </a>
        </div>
      ))}
    </div>
  )
}

function LessonBlock({ path }: { path: string }) {
  const mdx = <MDX path={path} />

  const headers = [
    {
      id: 'what-will-our-parameters-be',
      value: 'What will our parameters be',
      depth: 1,
    },
    { id: 'making-choices', value: 'Making choices', depth: 2 },
    { id: 'base-cases', value: 'Base Cases', depth: 3 },
    { id: 'base-cases', value: 'Base Cases', depth: 2 },
    { id: 'base-cases', value: 'Base Cases', depth: 2 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          width: {
            xs: 'none',
            sm: 'none',
            md: 'none',
            lg: '80%',
          },
        }}
      >
        {mdx}
      </Box>
      <Box
        sx={{
          width: '20%',
          display: {
            xs: 'none',
            sm: 'none',
            md: 'none',
            lg: 'inline-block',
          },
          verticalAlign: 'top',
        }}
      >
        <TableOfContents headers={path.includes('building') ? headers : []} />
      </Box>
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
    <LessonBlock
      key={lessonFilename}
      path={'/lessons/' + lesson + '/' + lessonFilename}
    />
  ))

  if (pageIndex === -1) {
    return <Navigate to={buildLessonURL(0)} replace />
  }

  return (
    <Box sx={{ position: 'relative', mt: 15 }}>
      <Container maxWidth="xl">
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
