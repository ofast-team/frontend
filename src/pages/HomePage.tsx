import { Typography, Container, Box } from '@mui/material'
import React from 'react'
import HomeLearn from '../components/HomePage/HomeLearn'
import HomeSolve from '../components/HomePage/HomeSolve'
import '../components/HomePage/HomePage.css'

export default function HomePage() {
  return (
    <Container
      sx={{
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
      <Box sx={{ height: '90vh' }}>
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
      <HomeLearn />
      <HomeSolve />
    </Container>
  )
}
