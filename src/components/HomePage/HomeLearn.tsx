import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

import './HomePage.css'

interface HomeLearnProps {
  svgModule: string
  svgGraphics: string
}

export default function HomeLearn({ svgModule, svgGraphics }: HomeLearnProps) {
  // const { ref } = useInView({
  //   threshold: 0.75,
  // })

  return (
    <div
      // className="snap-child-start snap-center"
      // ref={ref}
      style={{
        height: '100%',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          mt: 2,
          mb: 4,
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
                textShadow: '2px 2px 4px gray',
              }}
            >
              Learn
            </Typography>
            <Box
              sx={{
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <motion.img
                src={'/assets/gear.svg'}
                alt="Gear"
                className="gear-top"
                whileInView={{ rotate: 360 }}
              />
              <motion.img
                src={'/assets/gear.svg'}
                alt="Gear"
                className="gear-bottom"
                whileInView={{ rotate: -360 }}
              />
            </Box>
          </Box>
          <img src={svgModule} alt="Learn SVG" width="100%" />
        </Box>
        <Box sx={{ width: '50%' }}>
          <img src={svgGraphics} alt="Learn SVG" width="100%" />
        </Box>
      </Container>
    </div>
  )
}
