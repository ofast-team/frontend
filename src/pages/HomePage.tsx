import React, { useEffect, useRef, useState } from 'react'

import HomeCard from '../components/HomePage/HomeCard'
import HomeLearn from '../components/HomePage/HomeLearn'
import HomeSolve from '../components/HomePage/HomeSolve'
import '../components/HomePage/HomePage.css'
import { Box, Container } from '@mui/material'

export default function HomePage() {
  const learn_objects: [string, string][] = [
    ['assets/learn1_1.svg', 'assets/learn1.svg'],
    ['assets/learn2_1.svg', 'assets/learn2.svg'],
    ['assets/learn3_1.svg', 'assets/learn3.svg'],
  ]
  // const data = [<HomeCard />, <HomeLearn />, <HomeSolve />]
  const refs = useRef(new Array(learn_objects.length + 2))

  return (
    <Container sx={{ pt: 10, position: 'relative' }}>
      <Box className="scroll-container">
        <div
          className="scroll-area"
          style={{ width: '100%', margin: 'auto', position: 'relative' }}
          ref={(element) => {
            refs.current[0] = element
          }}
        >
          <HomeCard />
        </div>
        {learn_objects.map(([item_svgModule, item_svgGraphics], id) => {
          return (
            <div
              className="scroll-area"
              style={{ width: '100%', margin: 'auto', position: 'relative' }}
              ref={(element) => {
                refs.current[id + 1] = element
              }}
              key={id}
            >
              <HomeLearn
                svgModule={item_svgModule}
                svgGraphics={item_svgGraphics}
              />
            </div>
          )
        })}
        <div
          className="scroll-area"
          style={{ width: '100%', margin: 'auto', position: 'relative' }}
          ref={(element) => {
            refs.current[learn_objects.length + 1] = element
          }}
        >
          <HomeSolve />
        </div>
      </Box>
    </Container>
  )
}
