import { Box, Button, Typography } from '@mui/material'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import MDX from '../MDXRenderer'
import { UploadFile, WarningAmber } from '@mui/icons-material'

const errorText = 'Uploaded wrong file type or multiple files!'

export default function SubmitCode() {
  const [codeFile, setCodeFile] = useState<File>()
  const [codePreview, setCodePreview] = useState<string>('')
  const [errorType, setErrorType] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setErrorType(false)
    if (rejectedFiles || acceptedFiles.length > 1) {
      setErrorType(true)
    }
    if (acceptedFiles[0]) {
      setCodeFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/python': ['.py'],
      'text/c': ['.c'],
      'text/cpp': ['.cpp'],
      'text/java': ['.java'],
    },
    onDrop,
    maxFiles: 1,
  })

  const baseStyle = {
    padding: '50px',
    margin: '10px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    outline: 'none',
    transition: 'border 0.2s ease-in-out',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: '#808080',
    borderRadius: '2px',
    color: '#808080',
  }

  const activeStyle = {
    borderColor: '#2196f3',
  }

  const errorStyle = {
    borderColor: '#ff0000',
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(errorType ? errorStyle : {}),
    }),
    [isDragActive, errorType],
  )

  useEffect(() => {
    if (codeFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const fileExtension = codeFile.name.split('.').pop()
          if (fileExtension) {
            const language = fileExtension.toLowerCase()

            const markdownCode = `\`\`\`${language}\n${e.target.result.toString()}\n\`\`\``
            setCodePreview(markdownCode)
          }
        }
      }
      reader.readAsText(codeFile)
    }
  }, [codeFile])

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        height: '600px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        border: '1px solid #04364a',
        borderRadius: '10px',
      }}
    >
      {codePreview ? (
        <Box
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            maxWidth: '550px',
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Upload Program Code
          </Typography>
          <Typography
            variant="subtitle2"
            color="red"
            sx={{
              width: '100%',
              mb: 2,
            }}
          >
            <strong>Supported Languages: C, C++, Java, Python</strong>
          </Typography>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <UploadFile sx={{ fontSize: '50px', mb: 1.5 }} />
            <Typography variant="body1" mb={1.5}>
              Drag 'n' Drop Code File Here
            </Typography>
            <Button
              sx={{
                backgroundColor: '#fafafa',
                border: '1px solid #808080',
                borderRadius: '50px',
                color: '#808080',
                mb: 1.5,
                fontSize: '16px',
              }}
            >
              Select File
            </Button>
          </div>
          {errorType && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'red',
                mt: 1,
              }}
            >
              <WarningAmber />
              <Typography variant="subtitle2">
                <strong>{errorText}</strong>
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
