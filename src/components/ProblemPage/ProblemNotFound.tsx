import React from 'react'
import { Box, Typography } from '@mui/material'

export default function ProblemNotFound() {
  return (
    <Box pt={15} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Problem Not Found
      </Typography>
    </Box>
  )
}
