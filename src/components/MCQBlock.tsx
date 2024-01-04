import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Typography,
  styled,
} from '@mui/material'
import React, { useState } from 'react'
import OptionDisplay from './OptionDisplay'
import HintDisplay from './HintDisplay'

export const ShowAnswerBtn = styled(Button)({
  border: '1px solid #776E6E',
  color: '#776E6E',
  backgroundColor: 'transparent',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#8E8D8D',
    borderColor: '#8E8D8D',
    color: '#000000',
  },
  '&:active': {
    backgroundColor: '#8E8D8D',
    borderColor: '#8E8D8D',
  },
})

interface HeaderProps {
  hint: string
}
function Header({ hint }: HeaderProps) {
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
        Multiple Choice Question
      </Typography>
      <HintDisplay hint={hint} />
    </Box>
  )
}

interface MCQBlockProps {
  question: string
  answerOptions: string[]
  correctOptions: string[]
  hint: string
  explanation: string
}

export default function MCQBlock({
  question,
  answerOptions,
  correctOptions,
  hint,
  explanation,
}: MCQBlockProps) {
  const isMultiple = correctOptions.length > 1
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [attempts, setAttempts] = useState<number>(3)
  const [warning, setWarning] = useState<boolean>(false)

  const handleAnswerSelection = (option: string, display: string) => {
    if (display === 'check') {
      if (selectedAnswers.includes(option)) {
        setSelectedAnswers(
          selectedAnswers.filter((selectedOption) => selectedOption !== option),
        )
      } else {
        setSelectedAnswers([...selectedAnswers, option])
      }
    } else if (display === 'radio') {
      setSelectedAnswers([option])
    }
  }

  const handleSubmission = () => {
    if (selectedAnswers.length != correctOptions.length) {
      setWarning(true)
    } else {
      setWarning(false)
      setSubmitted(true)
      setAttempts(attempts - 1)
    }
  }

  const showAnswers = () => {
    setSelectedAnswers(correctOptions)
    setWarning(false)
    setSubmitted(true)
    setAttempts(0)
  }

  return (
    <Paper sx={{ border: '1px solid #000', my: 2 }}>
      <Header hint={hint} />
      {warning && (
        <Alert severity="warning" sx={{ m: 1 }}>
          <AlertTitle>Warning</AlertTitle>
          <strong>Select {correctOptions.length}!</strong>
        </Alert>
      )}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {question}
        </Typography>
        <OptionDisplay
          selectedAnswers={selectedAnswers}
          answerOptions={answerOptions}
          correctOptions={correctOptions}
          handleAnswerSelection={handleAnswerSelection}
          submitted={submitted}
          isMultiple={isMultiple}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <ShowAnswerBtn onClick={showAnswers}>Show Answer</ShowAnswerBtn>
          <Box sx={{ alignItems: 'center' }}>
            {submitted ? (
              <Button
                variant="contained"
                onClick={() => setSubmitted(false)}
                disabled={attempts === 0}
              >
                Try Again
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmission}
                disabled={attempts === 0}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            my: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: '1rem' }}>
            {attempts == 0 ? explanation : ''}
          </Typography>
          <Typography variant="subtitle2" color="error">
            Attempts Left: {attempts}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}
