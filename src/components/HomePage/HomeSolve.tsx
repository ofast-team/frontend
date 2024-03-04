import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { Box, Container, Typography } from '@mui/material'
import './HomeSolve.css'

export default function HomeSolve() {
  const solveCards = [
    'assets/solve1.svg',
    'assets/solve2.svg',
    'assets/solve3.svg',
    'assets/solve4.svg',
    'assets/solve5.svg',
  ]

  const ref = useRef(null)

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        my: 10,
      }}
    >
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
          Solve
        </Typography>
      </Box>
      <div
        style={{
          width: '100%',
          overflowX: 'scroll',
          overflowY: 'hidden',
          whiteSpace: 'nowrap',
        }}
        ref={ref}
        className="scroll-container"
      >
        {solveCards.map((path, index) => (
          <motion.img
            key={index}
            src={path}
            alt="Solve card"
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              width: '45%',
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        ))}
      </div>
    </Container>
  )
}
