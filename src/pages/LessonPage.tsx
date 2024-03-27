import React, { useEffect, useState } from 'react'

import { Box, Typography, Container } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import { motion, AnimatePresence } from 'framer-motion'

import { useParams, Navigate, Link, useLocation } from 'react-router-dom'

import lessons from '../lessons.json'
import getHeaders, { TOCHeader } from '../mdx-utils/get-headers'
import removeExtension from '../utils/removeExtension'
import LessonBlock from '../components/LessonPage/LessonBlock'

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
  const blockFilenames: string[] =
    'files' in lessons[lesson] ? lessons[lesson].files : []
  const [tocHeaders, setTocHeaders] = useState<TOCHeader[]>([])
  const [showTOC, setShowTOC] = useState<boolean>(true)

  if (!(lesson in lessons)) {
    return <Navigate to="/learn" replace />
  }

  const buildLessonURL = (newPageIndex: number) => {
    const filenameWithoutExt = removeExtension(blockFilenames[newPageIndex])
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
      headers={tocHeaders}
      showTOC={showTOC}
      toggleTOC={() => setShowTOC((curState) => !curState)}
    />
  ))

  useEffect(() => {
    async function genHeadersFromFile(filename: string) {
      fetch(`/lessons/${lesson}/${filename}`)
        .then((response) => response.text())
        .then(async (text) => {
          const headers = await getHeaders(text)
          headers.forEach((header) => {
            header.filenameWithoutExt = removeExtension(filename)
          })

          setTocHeaders((curHeaders) => {
            const newHeaders: TOCHeader[] = [...curHeaders]

            // To avoid duplicates during development because of React Strict Mode
            for (const header of headers) {
              if (
                !newHeaders.some(
                  (h) =>
                    h.slug === header.slug &&
                    h.depth === header.depth &&
                    h.value === header.value &&
                    h.filenameWithoutExt === header.filenameWithoutExt,
                )
              ) {
                newHeaders.push(header)
              }
            }

            return newHeaders
          })
        })
        .catch((error) => console.error(error))
    }

    async function genAllHeaders() {
      for (const lessonFilename of blockFilenames) {
        await genHeadersFromFile(lessonFilename)
      }
    }

    genAllHeaders()
  }, [])

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
