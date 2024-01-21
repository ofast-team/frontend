import { Box, Button, Typography } from '@mui/material'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { DriveFolderUpload, FolderZip, WarningAmber } from '@mui/icons-material'

const errorText = 'Uploaded wrong folder type!'

export default function SubmitCode() {
  const [testFolder, setTestFolder] = useState<File>()
  const [folderName, setFolderName] = useState<string>('')
  const [errorType, setErrorType] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setErrorType(false)
    if (rejectedFiles || acceptedFiles.length > 1) {
      setErrorType(true)
    }
    if (acceptedFiles[0]) {
      setTestFolder(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/zip': ['.zip'],
      'application/x-7z-compressed': ['.7z'],
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
    if (testFolder) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const temp = testFolder.name
          if (temp) {
            setFolderName(temp)
          }
        }
      }
      reader.readAsText(testFolder)
    }
  }, [testFolder])

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
        mr: 1,
      }}
    >
      {testFolder ? (
        <Box
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            overflowY: 'auto',
            maxWidth: '550px',
            maxHeight: '600px',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Uploaded Folder
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              m: 1,
            }}
          >
            <FolderZip sx={{ fontSize: '2rem', color: '#04364a', mr: 1 }} />
            <Typography variant="h4" color="primary">
              {folderName}
            </Typography>
          </Box>
          <Typography variant="h6" color="#2196f3">
            Click run above to test cases!
          </Typography>
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
            Upload Cases Folder
          </Typography>
          <Typography
            variant="subtitle2"
            color="red"
            sx={{
              width: '60%',
              mb: 2,
            }}
          >
            Zip Folder structure: Each test case folder with input{' '}
            <strong>(.in)</strong> and output <strong>(.out)</strong> files.
          </Typography>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <DriveFolderUpload sx={{ fontSize: '50px', mb: 1.5 }} />
            <Typography variant="body1" mb={1.5}>
              Drag 'n' Drop Folder Here
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
              Select Folder
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
