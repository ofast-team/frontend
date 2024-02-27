import { Box, Container } from '@mui/material'
import React, { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'

export default function HomeSolve() {
  const solveCards = [
    'assets/solve1.svg',
    'assets/solve2.svg',
    'assets/solve3.svg',
    'assets/solve4.svg',
    'assets/solve5.svg',
  ]
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%'])

  return (
    <Container ref={targetRef} sx={{ position: 'relative', height: '300vh' }}>
      <Box
        sx={{
          position: 'sticky',
          pt: 0,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div style={{ x }}>
          {solveCards.map((path) => {
            return <img src={path} alt="Solve Card" />
          })}
        </motion.div>
      </Box>
    </Container>
  )
}
