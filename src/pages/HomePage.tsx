import React, { useRef } from 'react'
// import { useInView } from 'react-intersection-observer'

import HomeCard from '../components/HomePage/HomeCard'
import HomeLearn from '../components/HomePage/HomeLearn'
import HomeSolve from '../components/HomePage/HomeSolve'
import '../components/HomePage/HomePage.css'
import { Container } from '@mui/material'

const SnapParent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => (
  <div ref={ref} {...props} className="snap-parent-y-mandatory">
    {props.children}
  </div>
))

const ScrollContainer = ({ children }) => {
  const ref = useRef(null)

  return (
    <div
      style={{
        position: 'relative',
        padding: 15,
      }}
    >
      <SnapParent
        ref={ref}
        style={{
          position: 'absolute',
        }}
      >
        {children}
      </SnapParent>
    </div>
  )
}

export default function HomePage() {
  return (
    <Container sx={{ p: 10 }}>
      <ScrollContainer>
        <HomeCard />
        <HomeLearn />
        <HomeSolve />
      </ScrollContainer>
    </Container>
  )
}
