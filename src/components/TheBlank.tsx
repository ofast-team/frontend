import { TextField, styled } from '@mui/material'
import React, { useState } from 'react'

// removes spaces, and checks for equality ignoring caps
function stringsAreEqual(a: string, b: string): boolean {
  a = a.replace(' ', '').toLowerCase()
  b = b.replace(' ', '').toLowerCase()
  return a == b
}

interface TheBlankProps {
  correctAnswer: string
  respond: boolean
}

const CorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottomColor: 'green',
  },

  '.MuiInput-underline:after': {
    borderBottomColor: 'green',
  },

  '.MuiFormHelperText-root.Mui-error': {
    color: 'green',
    position: 'absolute',
    top: '2.75em',
  },
})

const IncorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottomColor: 'red',
  },

  '.MuiInput-underline:after': {
    borderBottomColor: 'red',
  },

  '.MuiFormHelperText-root.Mui-error': {
    color: 'red',
    position: 'absolute',
    top: '2.75em',
  },
})

export default function TheBlank({ correctAnswer, respond }: TheBlankProps) {
  const [curAnswer, setCurAnswer] = useState('')

  if (respond) {
    return stringsAreEqual(curAnswer, correctAnswer) ? (
      <CorrectBlank
        variant="standard"
        onChange={(e) => setCurAnswer(e.target.value)}
        value={curAnswer}
        sx={{ width: correctAnswer.length * 20 + 5, m: 0.5 }}
        error
        helperText="Correct"
      ></CorrectBlank>
    ) : (
      <IncorrectBlank
        variant="standard"
        onChange={(e) => setCurAnswer(e.target.value)}
        value={curAnswer}
        sx={{ width: correctAnswer.length * 20 + 5, m: 0.5 }}
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
      sx={{ width: correctAnswer.length * 20 + 5, m: 0.5 }}
    />
  )
}
