import { Typography, Box, Container } from '@mui/material'
import React from 'react'
import { useInView } from 'react-intersection-observer'

export default function HomeCard() {
  // const { ref } = useInView({
  //   threshold: 0.75,
  // })
  return (
    <div
      // className="snap-child-start"
      // ref={ref}
      style={{
        height: '100%',
      }}
    >
      <Container
        sx={{ display: 'flex', flexDirection: 'column', mt: 2, mb: 4 }}
      >
        <Typography
          variant="h2"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
        <Box sx={{ height: '100%' }}>
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
