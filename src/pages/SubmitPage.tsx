import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import SubmitFields from '../components/SubmitPage/SubmitFields'

import SubmitCodeCard from '../components/SubmitPage/SubmitCodeCard'
import SubmitFolderCard from '../components/SubmitPage/SubmitFolderCard'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import RestrictedPage from './RestrictedPage'

export default function SubmitPage() {
  const user = useSelector((state: RootState) => state.user)
  if (!user.verified) {
    return <RestrictedPage />
  }

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
          gap: '10px',
          mt: 2,
        }}
      >
        <SubmitCodeCard />
        <SubmitFolderCard />
      </Box>
    </Container>
  )
}
