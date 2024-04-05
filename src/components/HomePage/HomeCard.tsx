import { Typography, Box, Container } from '@mui/material'
import React from 'react'

export default function HomeCard() {
  return (
    <div>
      <Container sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
        <Typography
          variant="h2"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'spaceBetween',
            alignItems: 'center',
            pt: 2,
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
        <Box sx={{ height: '700px' }}>
          <img
            className="card-rotate card-left"
            src="assets/learn.svg"
            alt="Learn card"
          />
          <img
            className="card-rotate card-right"
            src="assets/solve.svg"
            alt="Solve card"
          />
        </Box>
      </Container>
    </div>
  )
}
