import { Box, Container, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import InfoIcon from '@mui/icons-material/InfoOutlined'

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string
    webkitdirectory?: string
  }
}

export default function SubmitPage() {
  // const extensions = ['.c', '.cpp', '.java', '.python']
  const [codeFile, setCodeFile] = useState<File>()
  const [testFolder, setTestFolder] = useState<File>()

  useEffect(() => {
    if (codeFile) {
      console.log('Uploaded Code File:', codeFile)
    }
  }, [codeFile])

  useEffect(() => {
    if (testFolder) {
      console.log('Uploaded Test Folder:', testFolder)
    }
  }, [testFolder])

  const handleCodeFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCodeFile(file)
    }
  }

  const handleTestFolder = (event) => {
    const folder = event.target.files[0]
    if (folder) {
      setTestFolder(folder)
    }
  }

  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Submit
      </Typography>

      <Typography
        variant="body1"
        color="red"
        paragraph
        mb={3}
        sx={{ fontSize: '1.3rem' }}
      >
        <strong>Supported Languages: C, C++, Java, Python</strong>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography mr={2}>Program Code</Typography>
        <input
          type="file"
          accept=".c, .cpp, .java, .py"
          onChange={handleCodeFile}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography mr={2}>Test Cases Folder</Typography>
        <input
          type="file"
          directory="true"
          webkitdirectory="true"
          onChange={handleTestFolder}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <InfoIcon sx={{ color: 'red', fontSize: '1.3rem', mr: 1 }}></InfoIcon>
        <Typography variant="subtitle2" color="red">
          Folder structure: Each test case folder with single input{' '}
          <strong>(.in)</strong> and output <strong>(.out)</strong> files.
        </Typography>
      </Box>
    </Container>
  )
}

/*
Time limit text field
Checkers: diff - check ignore trailing whitespace/blank lines, epsilon - abs & relative fields, token - check case sensitive
 */
