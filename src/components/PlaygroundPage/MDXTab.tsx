import React from 'react'
import { Typography, TextField, Alert } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import MDX from '../MDXRenderer'

export default function MDXTab() {
  const [text, setText] = React.useState<string>('')
  const [isError, setIsError] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsError(false)
  }, [text])

  return (
    <>
      <TextField
        placeholder="Type MDX content here"
        multiline
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ my: '25px' }}
      />

      <Typography
        className="markdown themeborder"
        gutterBottom
        color="primary"
        component="span"
      >
        {!isError ? (
          <ErrorBoundary
            fallbackRender={() => <></>}
            onError={() => setIsError(true)}
          >
            <MDX value={text} />
          </ErrorBoundary>
        ) : (
          <Alert severity="error">Runtime Error</Alert>
        )}
      </Typography>
    </>
  )
}
