import React from 'react'

import { Container, Typography, Box } from '@mui/material'

import SearchBar from '../components/SearchBar'
import ProblemsTable from '../components/ProblemsTable'

export default function SolvePage() {
  return (
    <Container sx={{ p: 5 }}>
      <Typography variant="h3" gutterBottom color="primary">
        Solve
      </Typography>

      <SearchBar />

      <Box m={4} />

      <ProblemsTable />
    </Container>
  )
}
