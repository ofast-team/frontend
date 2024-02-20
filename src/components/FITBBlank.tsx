import { TextField, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import { FITBContext, FITBState } from './FITBBlock'

import { v4 as uuidv4 } from 'uuid'

// removes spaces, and checks for equality ignoring caps
function stringsAreEqual(a: string, b: string): boolean {
  a = a.replace(/ /gi, '').toLowerCase()
  b = b.replace(/ /gi, '').toLowerCase()
  return a == b
}

const CorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottom: 'solid 2px',
    borderBottomColor: '#1db924',
  },

  '.MuiInput-underline:after': {
    borderBottomColor: '#1db924',
  },

  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'black',
  },

  '.MuiFormHelperText-root.Mui-error': {
    color: '#1db924',
    position: 'absolute',
    top: '2em',
    fontSize: '1rem',
    fontWeight: '500',
  },
})

const IncorrectBlank = styled(TextField)({
  '.MuiInput-underline:before': {
    borderBottom: 'solid 2px',
    borderBottomColor: '#266078',
  },

  '.MuiInput-underline:after': {
    borderBottomColor: '#266078',
  },

  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'black',
  },

  '.MuiFormHelperText-root.Mui-error': {
    color: '#266078',
    position: 'absolute',
    top: '2em',
    fontSize: '1rem',
    fontWeight: '500',
  },
})

const ShowAnswerBlank = styled(TextField)({
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: '#194db5',
  },

  '.MuiInput-underline:before': {
    borderBottom: 'solid 1px',
    borderBottomColor: '#194db5',
  },
})

interface BlankProps {
  correctAnswer: string
}

export default function FITBBlank({ correctAnswer }: BlankProps) {
  const fitbState: FITBState = useContext<FITBState>(FITBContext)
  const [curAnswer, setCurAnswer] = useState('')
  const [numResets, setNumResets] = useState(0)
  const [guid, setGuid] = useState<string>('')

  useEffect(() => {
    if (guid === '') {
      setGuid(uuidv4())
    } else {
      fitbState.setBlankStatus(guid, stringsAreEqual(curAnswer, correctAnswer))
    }
  }, [curAnswer, numResets, fitbState])

  // Clear the blanks if the user just reset.
  if (fitbState.numResets > numResets) {
    setCurAnswer('')
    setNumResets(fitbState.numResets)
  }

  const handleChange = (curText: string) => {
    setCurAnswer(curText)
  }

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
        onChange={(e) => {
          handleChange(e.target.value)
        }}
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
        onChange={(e) => {
          handleChange(e.target.value)
        }}
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
      onChange={(e) => {
        handleChange(e.target.value)
      }}
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
