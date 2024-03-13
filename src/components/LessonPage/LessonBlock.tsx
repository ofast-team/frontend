import React, { useState } from 'react'

import { Box, IconButton, Tooltip } from '@mui/material'
import TocIcon from '@mui/icons-material/Toc'

import { motion } from 'framer-motion'

import TableOfContents from './TableOfContents'
import { TOCHeader } from '../../mdx-utils/get-headers'
import MDX from '../../components/MDXRenderer'

interface LessonBlockProps {
  path: string
  headers: TOCHeader[]
  showTOC: boolean
  toggleTOC: () => void
}

export default function LessonBlock({
  path,
  headers,
  showTOC,
  toggleTOC,
}: LessonBlockProps) {
  const mdx = <MDX path={path} />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
      }}
    >
      {/* Lesson Content */}
      <Box
        sx={{
          display: 'inline-block',
          width: showTOC
            ? {
                xs: '100%',
                sm: '100%',
                md: '100%',
                lg: 'calc(80% - 10px)',
              }
            : '100%',
        }}
      >
        {mdx}
      </Box>

      {/* Table of Contents */}
      <Box
        sx={{
          width: '20%',
          display: showTOC
            ? {
                xs: 'none',
                sm: 'none',
                md: 'none',
                lg: 'inline-block',
              }
            : 'none',
          pt: '7px',
          verticalAlign: 'top',
          position: 'relative',
        }}
      >
        <TableOfContents headers={headers} />
        <Tooltip title="Hide Table of Contents">
          <IconButton
            sx={{
              position: 'absolute',
              top: '2px',
              left: '220px',
              zIndex: 1,
            }}
            onClick={toggleTOC}
          >
            <TocIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* TOC Toggle Icon */}
      {!showTOC && (
        <Tooltip title="Show Table of Contents">
          <IconButton
            sx={{
              display: {
                xs: 'none',
                sm: 'none',
                md: 'none',
                lg: 'flex',
              },
              position: 'fixed',
              top: '144px',
              right: '13px',
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
            onClick={toggleTOC}
          >
            <TocIcon color="primary" />
          </IconButton>
        </Tooltip>
      )}
    </motion.div>
  )
}
