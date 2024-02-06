import { TextField, styled } from '@mui/material'
import React, { useContext, useState } from 'react'

import { FITBContext, FITBState } from './FITBBlock'

// removes spaces, and checks for equality ignoring caps
function stringsAreEqual(a: string, b: string): boolean {
  a = a.replace(/ /gi, '').toLowerCase()
  b = b.replace(/ /gi, '').toLowerCase()
  return a == b
}

const CorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottom: 'solid 2px',
    borderBottomColor: '#388e3c',
  },

  '.MuiInput-underline:after': {
    borderBottomColor: '#388e3c',
  },

  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'black',
  },

  '.MuiFormHelperText-root.Mui-error': {
    color: '#388e3c',
    position: 'absolute',
    top: '2em',
    fontSize: '1rem',
    fontWeight: '500',
  },
})

const IncorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottom: 'solid 2px',
    borderBottomColor: '#9e9e9e',
  },

  '.MuiInput-underline:after': {
    borderBottomColor: '#9e9e9e',
  },

  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'black',
  },

  '.MuiFormHelperText-root.Mui-error': {
    color: '#9e9e9e',
    position: 'absolute',
    top: '2em',
    fontSize: '1rem',
    fontWeight: '500',
  },
})

const ShowAnswerBlank = styled(TextField)({
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'black',
  },

  '.MuiInput-underline:before': {
    borderBottom: 'solid 1px',
    borderBottomColor: 'black',
  },
})

interface BlankProps {
  correctAnswer: string
}

export default function FITBBlank({ correctAnswer }: BlankProps) {
  const fitbState: FITBState = useContext<FITBState>(FITBContext)
  const [curAnswer, setCurAnswer] = useState('')

  if (fitbState.showAnswer) {
    return (
      <ShowAnswerBlank
        variant="standard"
        value={correctAnswer}
        disabled
        sx={{
          position: 'relative',
          bottom: 6,
          paddingLeft: 1,
          width: correctAnswer.length * 12,
          m: 0.5,
        }}
      />
    )
  }

  if (fitbState.submitted) {
    return stringsAreEqual(curAnswer, correctAnswer) ? (
      <CorrectBlank
        variant="standard"
        onChange={(e) => setCurAnswer(e.target.value)}
        value={curAnswer}
        sx={{
          position: 'relative',
          bottom: 6,
          paddingLeft: 1,
          fontSize: 22,
          width: correctAnswer.length * 12,
          m: 0.5,
        }}
        disabled
        error
        helperText="Correct"
      ></CorrectBlank>
    ) : (
      <IncorrectBlank
        variant="standard"
        onChange={(e) => setCurAnswer(e.target.value)}
        value={curAnswer}
        sx={{
          position: 'relative',
          bottom: 6,
          paddingLeft: 1,
          fontSize: 22,
          width: correctAnswer.length * 12,
          m: 0.5,
        }}
        disabled
        error
        helperText="Incorrect"
      ></IncorrectBlank>
    )
  }

  return (
    <TextField
      variant="standard"
      onChange={(e) => setCurAnswer(e.target.value)}
      value={curAnswer}
      sx={{
        position: 'relative',
        bottom: 6,
        paddingLeft: 1,
        fontSize: 22,
        width: correctAnswer.length * 12,
        m: 0.5,
      }}
    />
  )
}
