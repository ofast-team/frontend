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
import MDX from '../MDXRenderer'
import { UploadFile, WarningAmber } from '@mui/icons-material'
import { Delete } from '@mui/icons-material'

interface SubmitCodeCardProps {
  setCodeBase64: Dispatch<SetStateAction<string>>
  setCodeLang: Dispatch<SetStateAction<string>>
}

export default function SubmitCodeCard({
  setCodeBase64,
  setCodeLang,
}: SubmitCodeCardProps) {
  const errorText = 'Unsupported file type!'
  const [codeFile, setCodeFile] = useState<File | null>(null)
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
      'text/cxx': ['.cxx'],
      'text/cc': ['.cc'],
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

  const handleReset = () => {
    setCodePreview('')
    setCodeFile(null)
    setCodeBase64('')
    setErrorType(false)
  }

  useEffect(() => {
    if (codeFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const fileExtension = codeFile.name.split('.').pop()
          if (fileExtension) {
            let language = fileExtension.toLowerCase()
            if (language === 'cxx' || language === 'cc') language = 'cpp'

            const markdownCode = `\`\`\`${language}\n${e.target.result.toString()}\n\`\`\``
            const code = btoa(e.target.result.toString())
            setCodePreview(markdownCode)
            setCodeLang(language)
            setCodeBase64(code)
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'spaceBetween',
              alignItems: 'center',
              m: 1,
            }}
          >
            <Typography variant="h6">Code Preview</Typography>
            <IconButton onClick={handleReset} sx={{ m: 1 }}>
              <Delete sx={{ color: 'red', fontSize: '2rem' }} />
            </IconButton>
          </Box>
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
