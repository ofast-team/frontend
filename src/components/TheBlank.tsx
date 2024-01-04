import { TextField, styled } from '@mui/material'
import React, { useState } from 'react'

// removes spaces, and checks for equality ignoring caps
function stringsAreEqual(a: string, b: string): boolean {
  a = a.replace(' ', '').toLowerCase()
  b = b.replace(' ', '').toLowerCase()
  return a == b
}

const CorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottom: 'solid 1px',
    borderBottomColor: 'green',
    
  },

  '.MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: 'black',
  },

  '.MuiFormHelperText-root.Mui-error': {
    color: 'green',
    position: 'absolute',
    top: '2.75em',
  },
})

const IncorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottom: 'solid 1px',
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

const ShowAnswerBlank = styled(TextField)({
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: 'black',
  },

  '.MuiInput-underline:before': {
    borderBottom: 'solid 1px',
    borderBottomColor: 'black',

  },
})

interface TheBlankProps {
  correctAnswer: string
  respond: boolean
  showAnswer: boolean
}

export default function TheBlank({
  correctAnswer,
  respond,
  showAnswer,
}: TheBlankProps) {
  const [curAnswer, setCurAnswer] = useState('')

  if (showAnswer) {
    return (
      <ShowAnswerBlank
        variant="standard"
        value={correctAnswer}
        disabled
        sx={{ width: correctAnswer.length * 20 + 5, m: 0.5 }}
      />
    )
  }

  if (respond) {
    return stringsAreEqual(curAnswer, correctAnswer) ? (
      <CorrectBlank
        variant="standard"
        onChange={(e) => setCurAnswer(e.target.value)}
        value={curAnswer}
        sx={{ width: correctAnswer.length * 20 + 5, m: 0.5 }}
        disabled
        error
        helperText="Correct"
      ></CorrectBlank>
    ) : (
      <IncorrectBlank
        variant="standard"
        onChange={(e) => setCurAnswer(e.target.value)}
        value={curAnswer}
        sx={{ width: correctAnswer.length * 20 + 5, m: 0.5 }}
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
      sx={{ width: correctAnswer.length * 20 + 5, m: 0.5 }}
    />
  )
}
