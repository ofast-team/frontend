import React from 'react'
import { Container, Typography } from '@mui/material'

export default function ContributePage() {
  return (
    <Container sx={{ p: 15 }}>
      <Typography variant="h3" gutterBottom color="primary">
        How To Contribute
      </Typography>
      <Typography variant="body1" paragraph>
        Contribute to expand the O(fast)
      </Typography>
      <Typography variant="h3" gutterBottom color="primary">
        Lessons
      </Typography>
      <Typography variant="h3" gutterBottom color="primary">
        Problems
      </Typography>
    </Container>
  )
}
