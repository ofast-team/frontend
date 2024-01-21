import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { ShowAnswerBtn } from './MCQBlock'
import { Lightbulb } from '@mui/icons-material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import MDX from './MDXRenderer'

interface HeaderProps {
  setShowHint: Dispatch<SetStateAction<boolean>>,
  handleReset: () => void,
  handleShowAnswer: () => void,
}



function Header({
  setShowHint,
  handleShowAnswer,
  handleReset,
}: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6DB6C3',
        color: '#000',
        p: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'left',
        }}
      >
        Fill in the Blank
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <ShowAnswerBtn onClick={handleShowAnswer}>Show Answer</ShowAnswerBtn>
        <IconButton onClick={() => setShowHint(true)}>
          <Lightbulb sx={{ color: '#04364a', fontSize: '2rem', m: 0 }} />
        </IconButton>
        <RestartAltIcon onClick={handleReset} />
      </Box>
    </Box>
  )
}

interface FITBBlockProps {
  hint: string
  children: ReactNode
}

export interface FITBState {
  submitted: boolean,
  showAnswer: boolean,
}

export const FITBContext = createContext<FITBState>({ submitted: false, showAnswer: false })

export default function FITBBlock({ hint, children }: FITBBlockProps) {

  // only for the state we're passing down to the blanks
  const defaultState : FITBState = {submitted: false, showAnswer: false}
  const [state, setState] = useState<FITBState>(defaultState)

  // everything else
  const [showHint, setShowHint] = useState<boolean>(false)

  const handleReset = () => {
    setShowHint(false)
    setState((oldData: FITBState) => {
      return { ...oldData, submitted: false }
    })
    setState((oldData: FITBState) => {
      return { ...oldData, showAnswer: false}
    })
  }

  const handleShowAnswer = () => {
    setState((oldData: FITBState) => {
        return { ...oldData, showAnswer: true }
    })
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header setShowHint={setShowHint}
        handleReset={handleReset}
        handleShowAnswer={handleShowAnswer} />
      <Box sx={{ p: 3 }}>
        <FITBContext.Provider value = {state}>
          {children}
        </FITBContext.Provider>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {state.submitted ? (
            <Button
              variant="contained"
              onClick={() => {
                setState((oldData: FITBState) => {
                  return { ...oldData, submitted: false }
                })
              }}
              disabled={state.showAnswer}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setState((oldData: FITBState) => {
                  return { ...oldData, submitted: true }
                })
              }}
              disabled={state.showAnswer}
            >
              Submit
            </Button>
          )}
        </Box>
        {showHint ? <Typography sx={{ fontSize: '1rem' }}>
            <MDX value={hint} />
        </Typography> : <React.Fragment/>}
      </Box>
    </Paper>
  )
}
