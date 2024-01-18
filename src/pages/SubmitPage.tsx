import { Box, Container, Fab, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import SubmitFields from '../components/SubmitFields'

import MDX from '../components/MDXRenderer'

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    directory?: string
    webkitdirectory?: string
  }
}

const CodeCard = () => {
  const [codeFile, setCodeFile] = useState<File>()
  const [codePreview, setCodePreview] = useState('')

  useEffect(() => {
    if (codeFile) {
      console.log('Uploaded Code File:', codeFile)
    }
  }, [codeFile])

  const handleCodeFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      setCodeFile(file)

      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const fileExtension = file.name.split('.').pop()
          const language = fileExtension.toLowerCase()

          const markdownCode = `\`\`\`${language}\n${e.target.result.toString()}\n\`\`\``
          setCodePreview(markdownCode)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        height: '600px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #04364a',
      }}
    >
      {codePreview ? (
        <Box
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            maxWidth: '600px',
            maxHeight: '600px',
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Code Preview
          </Typography>
          <MDX value={codePreview} />
        </Box>
      ) : (
        <Box>
          <Typography mr={2} variant="h6" gutterBottom>
            Program Code
          </Typography>
          <label htmlFor="codeFile">
            <input
              style={{ display: 'none' }}
              id="codeFile"
              type="file"
              accept=".c, .cpp, .py, .java"
              onChange={handleCodeFile}
            />
            <Fab
              color="primary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
              sx={{ p: 2 }}
            >
              <AddIcon /> Upload File
            </Fab>
          </label>
          <Typography
            variant="subtitle2"
            color="red"
            sx={{
              width: '50%',
              mt: 2,
            }}
          >
            <strong>Supported Languages: C, C++, Java, Python</strong>
          </Typography>
        </Box>
      )}
    </Box>
  )
}

const FolderCard = () => {
  const [testFolder, setTestFolder] = useState<FileList>()
  const [testCasesCount, setTestCasesCount] = useState<number>(0)

  useEffect(() => {
    if (testFolder) {
      console.log('Uploaded Test Folder:', testFolder)
    }
  }, [testFolder])

  const handleTestFolder = (event) => {
    console.log(event.target.files)
    const folder = event.target.files
    if (folder) {
      setTestFolder(folder)
      setTestCasesCount(folder.length)
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        height: '600px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #04364a',
      }}
    >
      {testCasesCount ? (
        <Box
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            maxWidth: '600px',
            maxHeight: '600px',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Test Cases Count
          </Typography>
          <Typography>{testCasesCount}</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography mr={2} variant="h6" gutterBottom>
            Test Cases Folder
          </Typography>
          <label htmlFor="testFolder">
            <input
              style={{ display: 'none' }}
              id="testFolder"
              type="file"
              directory="true"
              webkitdirectory="true"
              onChange={handleTestFolder}
            />
            <Fab
              color="primary"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
              sx={{ p: 2 }}
            >
              <AddIcon /> Upload Folder
            </Fab>
          </label>
          <Typography
            variant="subtitle2"
            color="red"
            sx={{
              width: '50%',
              mt: 2,
            }}
          >
            Zip Folder structure: Each test case folder with input{' '}
            <strong>(.in)</strong> and output <strong>(.out)</strong> files.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default function SubmitPage() {
  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Submit
      </Typography>

      <SubmitFields />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'stretch',
          mt: 2,
        }}
      >
        <CodeCard />
        <FolderCard />
      </Box>
    </Container>
  )
}
