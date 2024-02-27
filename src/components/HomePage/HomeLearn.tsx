import React from 'react'
import { Box, Container, Typography } from '@mui/material'

interface HomeLearnComponent {
  title: string
  text: string
  svgPath: string
}

function HomeLearnComponent({ title, text, svgPath }: HomeLearnComponent) {
  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flexEnd',
        }}
        gutterBottom
      >
        Learn
      </Typography>
      <Box>
        <Typography>{title}</Typography>
        <Typography>{text}</Typography>
        <img src={svgPath} alt="Learn SVG" />
      </Box>
    </Container>
  )
}

export default function HomeLearn() {
  return (
    <Container>
      <Typography
        variant="h3"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        gutterBottom
      >
        Learn
      </Typography>
      <HomeLearnComponent
        title="Study"
        text="forever"
        svgPath="assets/learn1.svg"
      />
      <img src="assets/learn1.svg" alt="Learn 1" />
      <img src="assets/learn2.svg" alt="Learn 2" />
      <img src="assets/learn3.svg" alt="Learn 3" />
    </Container>
  )
}
