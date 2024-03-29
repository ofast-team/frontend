import { Typography, Container, Box } from '@mui/material'
import React from 'react'
import HomeCard from '../components/HomeCard'

export default function HomePage() {
  return (
    <Container
      sx={{
        height: '100vh',
        p: 15,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        gutterBottom
      >
        Master Competitive Programming
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: '2.5rem',
          fontWeight: '400',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Learn & Solve with O(fast)
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 3,
        }}
      >
        <HomeCard />
      </Box>
    </Container>
  )
}
