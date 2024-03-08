import { Box, Button, IconButton, Typography } from '@mui/material'
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Delete,
  DriveFolderUpload,
  FolderZip,
  WarningAmber,
} from '@mui/icons-material'

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string
    webkitdirectory?: string
  }
}

interface SubmitFolderCardProps {
  setInputArray: Dispatch<SetStateAction<string[]>>
  setOutputArray: Dispatch<SetStateAction<string[]>>
}

export default function SubmitFolderCard({
  setInputArray,
  setOutputArray,
}: SubmitFolderCardProps) {
  const errorText = 'Unsupported folder structure!'
  const [testFolder, setTestFolder] = useState<FileList | null>(null)
  const [errorType, setErrorType] = useState<boolean>(false)

  const onDrop = useCallback((acceptedFiles) => {
    setErrorType(false)
    if (acceptedFiles.length > 1) {
      setTestFolder(acceptedFiles)
    } else {
      setErrorType(true)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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

  const handleReset = () => {
    setTestFolder(null)
    setErrorType(false)
    setInputArray([])
    setOutputArray([])
  }

  useEffect(() => {
    if (testFolder && !errorType) {
      console.log(testFolder)
      const filesMap = new Map<string, { in: File | null; out: File | null }>()
      Array.from(testFolder).forEach((file: File) => {
        const fileName = file.name.split('.')[0]
        const fileExtension = file.name.split('.').pop()

        if (!filesMap.has(fileName)) {
          filesMap.set(fileName, { in: null, out: null })
        }

        if (fileExtension === 'in') {
          filesMap.get(fileName)!.in = file
        } else if (fileExtension === 'out') {
          filesMap.get(fileName)!.out = file
        }
      })

      for (const [fileName, files] of filesMap.entries()) {
        console.log(fileName, files.in, files.out)
      }

      for (const [fileName, files] of filesMap.entries()) {
        console.log(fileName)
        if (files.in == null || files.out == null) {
          console.log('ERROR')
          setErrorType(true)
          return
        }
      }

      const newInputArray: string[] = []
      const newOutputArray: string[] = []
      filesMap.forEach(({ in: inFile, out: outFile }) => {
        const readerIn = new FileReader()
        readerIn.onload = () => {
          if (readerIn.result)
            newInputArray.push(btoa(readerIn.result.toString()))
        }
        readerIn.readAsText(inFile!)
        const readerOut = new FileReader()
        readerOut.onload = () => {
          if (readerOut.result)
            newOutputArray.push(btoa(readerOut.result.toString()))
        }
        readerOut.readAsText(outFile!)
      })
      setInputArray(newInputArray)
      setOutputArray(newOutputArray)
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
      }}
    >
      {testFolder && !errorType ? (
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
            <Typography variant="h6">Uploaded Folder</Typography>
            <IconButton onClick={handleReset} sx={{ m: 1 }}>
              <Delete sx={{ color: 'red', fontSize: '2rem' }} />
            </IconButton>
          </Box>
          <Typography variant="h4" color="green">
            Successfully Uploaded Test Cases!
          </Typography>
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
            Folder structure: Each test case with corresponding file name input{' '}
            <strong>(.in)</strong> and output <strong>(.out)</strong> files.
          </Typography>
          <div {...getRootProps({ style })}>
            <input
              {...getInputProps()}
              type="file"
              directory="true"
              webkitdirectory="true"
            />
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
