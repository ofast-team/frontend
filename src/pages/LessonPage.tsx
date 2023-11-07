import React, { useEffect, useState, useRef } from 'react'

import { Box, Button, Container } from '@mui/material'

import { styled } from '@mui/material/styles'

interface LessonPageProps {
  blocks: ReadonlyArray<React.ReactNode>
}

const blockStyle = {
  pt: 4,
  scrollSnapAlign: 'center',
  height: '100%',
  overflowY: 'auto'
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function SideNavigatorItem({ selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className="fadeColor"
      style={{
        marginTop: 10,
        height: (selected ? 100 : 40),
        backgroundColor: (selected ? 'black' : 'blue'),
        borderRadius: 50,
        cursor: 'pointer'
      }}
    />
  );
}

export default function LessonPage({blocks}: LessonPageProps) {
  const refs = useRef(new Array(blocks.length));
  const [offsetY, setOffsetY] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const divRef = useRef();

  useEffect(() => {
    console.log(divRef.current);
  }, [divRef.current]);

  const currentIndex = () => Math.round(offsetY / windowDimensions.height);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset)
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{position: 'relative'}}>
      <Box ref={divRef} sx={{
        width: '100%',
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory'
      }}>
        {blocks.map((block, id) => {
          return (
            <Container key={id} sx={blockStyle} ref={(element) => { refs.current[id] = element }}>
              {block}
            </Container>
          )
        })}
      </Box>

      <Box sx={{
        width: 20,
        transform: 'translateY(-50%)',
        position: 'fixed',
        top: '50%',
        left: '20px'
      }}>
        {blocks.map((item, id) => {
          return (
            <SideNavigatorItem
              key={id}
              selected={currentIndex() === id}
              onClick={() => refs.current[id].scrollIntoView({ behavior: 'smooth' })}
            />
          )
        })}
      </Box>
    </Box>
  )
}
