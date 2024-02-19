import React, { ReactNode, createContext, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import MDX from './MDXRenderer'
import Header from './Header'
import Result from './Result'
import { TipsAndUpdates } from '@mui/icons-material'

// Store each blank and its status.
type HashMap = {
  [uuid: string]: boolean
}

interface FITBBlockProps {
  explanation?: string
  hint?: string
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

export default function FITBBlock({
  explanation,
  hint,
  children,
}: FITBBlockProps) {
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
  const [result, setResult] = useState<number>(0)

  const handleReset = () => {
    setResult(0)
    setShowHint(false)
    setFitbState((oldData: FITBState) => {
      return { ...defaultFitbState, numResets: oldData.numResets + 1 }
    })
  }

  const handleShowAnswer = () => {
    setResult(1)
    setShowHint(false)
    setFitbState((oldData: FITBState) => {
      return { ...oldData, showAnswer: true }
    })
  }

  const handleTryAgain = () => {
    setResult(0)
    setFitbState((oldData: FITBState) => {
      return { ...oldData, submitted: false }
    })
  }

  const allCorrect = () => {
    if (Object.values(blanks).every((blank) => blank === true)) {
      setResult(1)
      return true
    }
    return false
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header
        title="Fill in the Blank"
        setShowHint={setShowHint}
        showAnswers={handleShowAnswer}
        handleReset={handleReset}
        result={result}
        hint={hint}
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
              onClick={handleTryAgain}
              disabled={result === 1}
              sx={{
                fontSize: '1rem',
                display: `${result === 1 ? 'none' : 'block'}`,
              }}
            >
              Try Again
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                allCorrect()
                setFitbState((oldData: FITBState) => {
                  return { ...oldData, submitted: true }
                })
              }}
              disabled={result === 1}
              sx={{
                fontSize: '1rem',
                display: `${result === 1 ? 'none' : 'block'}`,
              }}
            >
              Submit
            </Button>
          )}
        </Box>
        {result != 0 && (
          <Result
            result={result}
            explanation={explanation}
            submitted={fitbState.submitted}
          />
        )}
        <Box>
          {showHint && (
            <div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: 'fit-content',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  mt: 1,
                  pr: 1,
                  backgroundColor: '#f4e458',
                  gap: '8px',
                }}
              >
                <TipsAndUpdates
                  sx={{ color: 'primary', fontSize: '1.3rem', m: 0, pl: 1 }}
                />
                <Typography>Hint</Typography>
              </Box>
              <Typography sx={{ fontSize: '1.1rem', pr: 1 }}>
                <MDX value={hint} />
              </Typography>
            </div>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
