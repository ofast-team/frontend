import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import SubmitFields from '../components/SubmitFields'

import SubmitCodeCard from '../components/SubmitCodeCard'
import SubmitFolderCard from '../components/SubmitFolderCard'

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
        <SubmitCodeCard />
        <SubmitFolderCard />
      </Box>
    </Container>
  )
}
