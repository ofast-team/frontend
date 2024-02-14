import React, { ReactNode, createContext, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import Header from './Header'
import MDX from './MDXRenderer'

interface HeaderProps {
  setShowHint: Dispatch<SetStateAction<boolean>>
  handleReset: () => void
  handleShowAnswer: () => void
  setBlankStatus: (uuid: string, correct: boolean) => void
}

function Header({ setShowHint, handleShowAnswer, handleReset }: HeaderProps) {
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

// Store each blank and its status.
type HashMap = {
  [uuid: string]: boolean
}

interface FITBBlockProps {
  hint: string
  children: ReactNode
}

// This data will be passed down to the blanks
export interface FITBState {
  submitted: boolean
  showAnswer: boolean
  numResets: number
  setBlankStatus: (uuid: string, correct: boolean) => void
}

export const FITBContext = createContext<FITBState>({
  submitted: false,
  showAnswer: false,
  numResets: 0,
  setBlankStatus: () => {},
})

export default function FITBBlock({ hint, children }: FITBBlockProps) {
  const [blanks, setBlanks] = useState<HashMap>({})

  const setBlankStatus = (uuid: string, correct: boolean) => {
    setBlanks((oldData: HashMap) => {
      return { ...oldData, [uuid]: correct }
    })
  }

  const defaultFitbState: FITBState = {
    submitted: false,
    showAnswer: false,
    numResets: 0,
    setBlankStatus: setBlankStatus,
  }
  const [fitbState, setFitbState] = useState<FITBState>(defaultFitbState)
  const [showHint, setShowHint] = useState<boolean>(false)

  const handleReset = () => {
    setShowHint(false)
    setFitbState((oldData: FITBState) => {
      return { ...defaultFitbState, numResets: oldData.numResets + 1 }
    })
  }

  const handleShowAnswer = () => {
    setFitbState((oldData: FITBState) => {
      return { ...oldData, showAnswer: true }
    })
  }

  const allCorrect = () => {
    return Object.values(blanks).every((blank) => blank === true)
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header
        title={'Fill in the Blank'}
        setShowHint={setShowHint}
        handleReset={handleReset}
        handleShowAnswer={handleShowAnswer}
        setBlankStatus={setBlankStatus}
      />
      <Box sx={{ p: 3 }}>
        <FITBContext.Provider value={fitbState}>
          {children}
        </FITBContext.Provider>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {!fitbState.submitted || (fitbState.submitted && allCorrect()) ? (
            <Button
              variant="contained"
              onClick={() => {
                setFitbState((oldData: FITBState) => {
                  return { ...oldData, submitted: true }
                })
              }}
              disabled={
                fitbState.showAnswer || (fitbState.submitted && allCorrect())
              }
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setFitbState((oldData: FITBState) => {
                  return { ...oldData, submitted: false }
                })
              }}
              disabled={fitbState.showAnswer || allCorrect()}
            >
              Try Again
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
