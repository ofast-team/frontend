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

const LessonButton = styled(Button)({
  border: '1px solid',
  borderRadius: 20,
  paddingLeft: '20px',
  paddingRight: '20px',
  textTransform: 'none',
  fontSize: 25,
  fontFamily: ['Raleway', 'sans-serif'].join(','),
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#04364A',
    borderColor: '#04364A',
    color: '#DAFFFB',
  },
  '&:active': {
    backgroundColor: '#04364A',
    borderColor: '#04364A',
  },
})

export default function LessonPage(props: LessonPageProps) {
  // const [currentBlock, setCurrentBlock] = useState<number>(0)
  // const refs = useRef(new Array(2));
  // const [offsetY, setOffsetY] = useState(0);
  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setOffsetY(window.pageYOffset)
  //     console.log(window.pageYOffset)
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // useEffect(() => {
  //   const handleResize = () => setWindowDimensions(getWindowDimensions());
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // const currentIndex = () => Math.round(offsetY / windowDimensions.height);

  return (
    <Box sx={{
      width: '100%',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory'
    }}>
      {props.blocks.map(block => {
        return (
          <Container sx={blockStyle}>
            {block}
          </Container>
        )
      })}
    </Box>
  )
}
