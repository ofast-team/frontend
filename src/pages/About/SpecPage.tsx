import React from 'react'
import { Container, Typography } from '@mui/material'

export default function SpecPage() {
  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Technical Specifications
      </Typography>
      <Typography variant="body1" paragraph>
        Languages supported and code samples in C++.
      </Typography>
      <Typography variant="h3" gutterBottom color="primary">
        Team
      </Typography>
    </Container>
  )
}
