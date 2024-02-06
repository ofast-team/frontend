import React, { ReactNode, createContext, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import Header from './Header'
import MDX from './MDXRenderer'

interface FITBBlockProps {
  hint: string
  children: ReactNode
}

export interface FITBState {
  submitted: boolean
  showAnswer: boolean
}

export const FITBContext = createContext<FITBState>({
  submitted: false,
  showAnswer: false,
})

export default function FITBBlock({ hint, children }: FITBBlockProps) {
  // only for the state we're passing down to the blanks
  const defaultFitbState: FITBState = { submitted: false, showAnswer: false }
  const [fitbState, setFitbState] = useState<FITBState>(defaultFitbState)

  // everything else
  const [showHint, setShowHint] = useState<boolean>(false)

  const handleReset = () => {
    setShowHint(false)
    setFitbState((oldData: FITBState) => {
      return { ...oldData, submitted: false }
    })
    setFitbState((oldData: FITBState) => {
      return { ...oldData, showAnswer: false }
    })
  }

  const handleShowAnswer = () => {
    setFitbState((oldData: FITBState) => {
      return { ...oldData, showAnswer: true }
    })
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header
        title={'Fill in the Blank'}
        setShowHint={setShowHint}
        handleReset={handleReset}
        showAnswers={handleShowAnswer}
        result={2}
      />
      <Box sx={{ p: 3 }}>
        <FITBContext.Provider value={fitbState}>
          {children}
        </FITBContext.Provider>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 3,
            flexDirection: 'row',
          }}
        >
          {fitbState.submitted ? (
            <Button
              variant="contained"
              onClick={() => {
                setFitbState((oldData: FITBState) => {
                  return { ...oldData, submitted: false }
                })
              }}
              disabled={fitbState.showAnswer}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setFitbState((oldData: FITBState) => {
                  return { ...oldData, submitted: true }
                })
              }}
              disabled={fitbState.showAnswer}
            >
              Submit
            </Button>
          )}
        </Box>
        {showHint ? (
          <Typography sx={{ fontSize: '1rem' }}>
            <MDX value={hint} />
          </Typography>
        ) : (
          <React.Fragment />
        )}
      </Box>
    </Paper>
  )
}
