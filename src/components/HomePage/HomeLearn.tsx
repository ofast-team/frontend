import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { Settings } from '@mui/icons-material'

interface HomeLearnComponent {
  svgModule: string
  svgGraphics: string
}

function HomeLearnComponent({ svgModule, svgGraphics }: HomeLearnComponent) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'spaceBetween',
        my: 10,
      }}
    >
      <Box sx={{ width: '50%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              justifyContent: 'flex-end',
              letterSpacing: '5px',
              textTransform: 'upperCase',
              alignItems: 'center',
              color: 'primary',
            }}
          >
            Learn
          </Typography>
          <Settings sx={{ fontSize: '5em' }} />
        </Box>
        <img src={svgModule} alt="Learn SVG" width="100%" />
      </Box>
      <Box sx={{ width: '50%' }}>
        <img src={svgGraphics} alt="Learn SVG" width="100%" />
      </Box>
    </Container>
  )
}

export default function HomeLearn() {
  const objects = [
    ['assets/learn1_1.svg', 'assets/learn1.svg'],
    ['assets/learn2_1.svg', 'assets/learn2.svg'],
    ['assets/learn3_1.svg', 'assets/learn3.svg'],
  ]

  return (
    <Container>
      {objects.map((index) => (
        <HomeLearnComponent svgModule={index[0]} svgGraphics={index[1]} />
      ))}
    </Container>
  )
}
