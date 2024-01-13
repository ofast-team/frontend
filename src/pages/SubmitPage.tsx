import { Container, Typography } from '@mui/material'
import React from 'react'

export default function SubmitPage() {
  const rules = `1. Please submit code as separate file. Supported languages are C, C++, Java, and Python.
    2. For test cases, please submit a folder structured with sub-directories for each test case with respective input (.in) and output (.out) files.`

  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Submit
      </Typography>
      <Typography variant="h4" color="red" sx={{ fontSize: '1.5rem' }}>
        Instructions:
      </Typography>
      <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-line' }}>
        {rules}
      </Typography>
    </Container>
  )
}
