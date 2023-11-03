import React from 'react'
import { useState } from 'react'
import { Box, Button, Container } from '@mui/material'

import { styled } from '@mui/material/styles'

interface LessonPageProps {
  blocks: ReadonlyArray<React.ReactNode>
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
  const [currentBlock, setCurrentBlock] = useState<number>(0)

  return (
    <Container>
      {props.blocks[currentBlock]}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <LessonButton
          onClick={() =>
            setCurrentBlock((blockIndex) =>
              blockIndex - 1 >= 0 ? blockIndex - 1 : 0,
            )
          }
        >
          Back
        </LessonButton>
        <LessonButton
          onClick={() =>
            setCurrentBlock(
              (blockIndex) => (blockIndex + 1) % props.blocks.length,
            )
          }
        >
          Next
        </LessonButton>
      </Box>
    </Container>
  )
}
