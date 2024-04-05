import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Box, Container, Typography } from '@mui/material'
import { useInView } from 'react-intersection-observer'

import './HomePage.css'

export default function HomeSolve() {
  // const { ref } = useInView({
  //   threshold: 0.75,
  // })

  const ref = useRef(null)

  const solveCards = [
    'assets/solve1.svg',
    'assets/solve2.svg',
    'assets/solve3.svg',
    'assets/solve4.svg',
    'assets/solve5.svg',
  ]

  return (
    <div
      // className="snap-child-start"
      // ref={ref}
      style={{
        height: '100%',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 2,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '3px',
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
            Solve
          </Typography>
        </Box>
        <div
          style={{
            width: '100%',
            overflowX: 'scroll',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'row',
          }}
          ref={ref}
          className="solve-scroll-container"
        >
          {solveCards.map((path, index) => (
            <motion.img
              key={index}
              src={path}
              alt="Solve card"
              style={{
                cursor: 'pointer',
                width: '42%',
                position: 'relative',
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}
