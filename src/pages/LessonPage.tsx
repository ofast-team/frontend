import React from 'react'
import { useState } from 'react'
import {
  Button,
  Typography,
  Container
} from '@mui/material'

import { styled } from '@mui/material/styles'

interface LessonPageProps {
  blocks: ReadonlyArray<React.ReactNode>;
}

const LessonButton = styled(Button)({
  border: '1px solid',
  borderRadius: 30,
  padding: '6px 12px',
  textTransform: 'none',
  fontSize: 28,
  fontFamily: [
    'Raleway',
    'sans-serif',
  ].join(','),
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
});

export default function LessonPage(props: LessonPageProps) {
  const [currentBlock, setCurrentBlock] = useState<number>(0);

  return (
    <Container>
      {props.blocks[currentBlock]}

      <LessonButton onClick={() => setCurrentBlock(cur => (cur + 1) % props.blocks.length)}>
        Next
      </LessonButton>

    </Container>
  )
}
